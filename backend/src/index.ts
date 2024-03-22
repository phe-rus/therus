import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";
import cors from "cors";
import { generateUID } from "./utils/generate_uid";
import path from "path";
import { execSync } from "child_process"; // Import execSync for running shell commands

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8010;

const allowedOrigins = ["http://localhost:3000"];

app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Adjust the origin as needed
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Sample database initialization
const databaseDirectory = "./database";
const databasePath = path.join(databaseDirectory, "user-database.json");
const secretKey = process.env.JWT_SECRET || "missing_error";

try {
  // Check if the directory exists, if not, create it
  if (!fs.existsSync(databaseDirectory)) {
    fs.mkdirSync(databaseDirectory);
  }

  // Check if database file exists, if not, create it with empty JSON object
  if (!fs.existsSync(databasePath)) {
    fs.writeFileSync(databasePath, "{}");
    console.log("Database file created successfully.");
  } else {
    console.log("Database file already exists.");
  }
} catch (error) {
  console.error("Error initializing database:", error);
}

// Function to read users from the database
const readUsers = (): { [key: string]: any } => {
  const data = fs.readFileSync(databasePath, "utf-8");
  return JSON.parse(data);
};

// Function to write users to the database
const writeUsers = (users: { [key: string]: any }) => {
  fs.writeFileSync(databasePath, JSON.stringify(users, null, 2));
};

// Middleware to verify JWT token
const verifyToken = (req: Request, res: Response, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.body.currentUser = decoded;
    next();
  });
};

// Root route to test server
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Create user route
app.post("/create", (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  // Validate request body
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Email, password, and name are required" });
  }

  // Check if email already exists
  const users = readUsers();
  if (users[email]) {
    return res.status(400).json({ message: "Email already exists" });
  }
  if (users[name]) {
    return res.status(400).json({ message: "Name already exists" });
  }

  // Generate UID for the user
  const uid = generateUID();

  var d = new Date();
  var createdAt = d.toLocaleString();

  // Hash password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    // Save user to database
    users[email] = { name, email, password: hash, uid, createdAt };
    writeUsers(users);
    res.status(201).json({ message: "User created successfully" });
  });
});

// Login route
app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Check if user exists
  const users = readUsers();
  const user = users[email];
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Compare passwords
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error comparing passwords" });
    }
    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email, uid: user.uid }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  });
});

// Get current user route
app.get("/current_user", verifyToken, (req: Request, res: Response) => {
  const currentUser = req.body.currentUser;
  res.status(200).json(currentUser);
});

app.post("/create_project", (req: Request, res: Response) => {
  const { projectName, projectId, currentUserUid } = req.body;

  // Validate request body
  if (!projectName || !projectId || !currentUserUid) {
    return res.status(400).json({
      message: "Project name, project ID, and current user UID are required",
    });
  }

  const projectDirectory = `./database/${currentUserUid}/${projectId}`;
  // Check if project directory already exists
  if (!fs.existsSync(projectDirectory)) {
    try {
      // Create parent directories if they don't exist
      execSync(`mkdir -p ${projectDirectory}`);

      // Create subdirectories for database, storage, config
      fs.mkdirSync(`${projectDirectory}/database`);
      fs.mkdirSync(`${projectDirectory}/storage`);
      fs.mkdirSync(`${projectDirectory}/config`);

      // Write project data to project.json
      fs.writeFileSync(
        `${projectDirectory}/project.json`,
        JSON.stringify({ projectName, projectId })
      );

      return res
        .status(200)
        .json({ message: `${projectName} created successfully` });
    } catch (error) {
      console.error("Error creating project:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(400).json({ message: "Project already exists" });
  }
});

app.get("/projects", (req: Request, res: Response) => {
  const currentUserUid = req.query.currentUserUid as string;

  // Validate currentUserUid
  if (!currentUserUid) {
    return res.status(400).json({ message: "Current user UID is required" });
  }

  const projectsDirectory = `./database/${currentUserUid}`;
  // Check if user's projects directory exists
  if (fs.existsSync(projectsDirectory)) {
    try {
      // Read the user's projects from the projects directory
      const projects = fs.readdirSync(projectsDirectory);
      const projectList = projects.map((projectId) => {
        // Read project data from project.json
        const projectData = JSON.parse(
          fs.readFileSync(
            `${projectsDirectory}/${projectId}/project.json`,
            "utf-8"
          )
        );
        return { projectId, projectName: projectData.projectName };
      });

      return res.status(200).json(projectList);
    } catch (error) {
      console.error("Error reading projects:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res
      .status(404)
      .json({ message: "No projects found for the current user" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
