import { error } from "console";

const BASE_URL = "http://localhost:8010";

export const therus = {
    async createUser(name: string, email: string, password: string) {
        try {
            const response = await fetch(`${BASE_URL}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
            if (response.ok) {
                return { success: true };
            } else {
                const data = await response.json();
                return { success: false, error: data.message };
            }
        } catch (error) {
            console.error("Error creating user:", error);
            return { success: false, error: "An error occurred while creating user" };
        }
    },
    async loginUser(email: string, password: string) {
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                return { success: true, token: data.token };
            } else {
                const data = await response.json();
                return { success: false, error: data.message };
            }
        } catch (error) {
            console.error("Error logging in:", error);
            return { success: false, error: "An error occurred while logging in" };
        }
    },
    async getCurrentUser(token: string) {
        try {
            const response = await fetch(`${BASE_URL}/current_user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                return { success: true, currentUser: data };
            } else {
                const data = await response.json();
                return { success: false, error: data.message };
            }
        } catch (error) {
            console.error("Error getting current user:", error);
            return { success: false, error: "An error occurred while getting current user" };
        }
    },
    async logoutUser() {
        try {
            localStorage.removeItem('session');
            return { success: true };
        } catch (error) {
            console.error("Error logging out:", error);
            return { success: false, error: "An error occurred while logging out" };
        }
    },
    async createProject(projectName: string, projectId: string, currentUserUid: string) {
        try {
            const response = await fetch('http://localhost:8010/create_project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectName, projectId, currentUserUid }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Project created successfully:', data.message);
                return { suc: true, mes: data.message }
            } else {
                console.error('Failed to create project:', data.message);
                return { suc: false, er: data.message }
            }
        } catch (error) {
            console.error('Error creating project:', error);
            return { suc: false, er: error }
        }
    },
    async fetchProjects(currentUserUid: any): Promise<any[]> {
        try {
            if (!currentUserUid) {
                console.error('Current user UID is required');
                return [];
            }

            const response = await fetch(`http://localhost:8010/projects?currentUserUid=${currentUserUid}`);
            const data = await response.json();

            if (response.ok) {
                console.log('Projects:', data);

                // Construct the desired object structure
                const projects: any[] = data.map((project: any) => ({
                    title: project.projectName,
                    publicName: project.projectId,
                    platforms: {
                        android: false,
                        web: false,
                        ios: false,
                        multiplatform: false
                    }
                }));

                console.log(`projects ${projects}`)
                return projects;
            } else {
                console.error('Failed to fetch projects:', data.message);
                return [];
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            return [];
        }
    }

}