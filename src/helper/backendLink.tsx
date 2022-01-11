let devEnviournment: string;;
let backendLink: string;

devEnviournment = "inProduction";
// devEnviournment = "inDevelopment";

if (devEnviournment === "inProduction") {
  backendLink = "https://parkour-backend.herokuapp.com";
} else if(devEnviournment === "inDevelopment") {
  backendLink = "http://localhost:5000";
}

export { backendLink };
