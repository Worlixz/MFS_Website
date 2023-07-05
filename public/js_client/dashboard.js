import { dashboardUser } from "./script-function.js";


const navbarDashboard = document.getElementById('navbarDashboard')
const dashboard = document.getElementById('dashboard')

navbarDashboard.innerHTML = `<p>Barre de navigation</p>`
dashboard.innerHTML = `<h2>dashboard</h2>`

// Nécessiter de connaitre les droits de l'utilisateur

