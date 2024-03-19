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
}