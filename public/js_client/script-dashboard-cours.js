import { callDataWithLog, parseJWT } from './script-function.js'
const urlApi = 'http://localhost:8000/api/dashboard'
const container = document.getElementById('containerDashboardCandA')

const navBarAdmin = document.getElementById('navbar-admin')
const navBarMembre = document.getElementById('navbar-membre')
const navBarEditor = document.getElementById('navbar-editor')

window.addEventListener('DOMContentLoaded', (e) => {
  callDataWithLog(urlApi)
  const user = parseJWT()
  console.log(user)
  if(user.userRole === "admin"){
    navBarAdmin.classList.toggle('displayFlex')
    navBarMembre.classList.toggle('displayNone')
    navBarEditor.classList.toggle('displayNone')
  }
  else if(user.userRole === "editeur"){
    navBarEditor.classList.toggle('displayFlex')
    navBarAdmin.classList.toggle('displayNone')
    navBarMembre.classList.toggle('displayNone')
  }
  else if(user.userRole === "membre"){
    navBarMembre.classList.toggle('displayFlex')
    navBarAdmin.classList.toggle('displayNone')
    navBarEditor.classList.toggle('displayNone')
  }else{
    window.location.href="/"
  }
})
