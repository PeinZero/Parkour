let inProduction: Boolean = false;

let backendLink: string;

if (!inProduction) {
  backendLink = "https://parkour-backend.herokuapp.com";
} else {
  backendLink = "http://localhost:5000";
}

export { backendLink };
