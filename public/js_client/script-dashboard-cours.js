import { gestionAcces, gestionJwt } from './script-function.js'
const urlApi = 'http://localhost:8000/api/dashboard'
const container = document.getElementById('containerDashboardCandA')

const navBarAdmin = document.getElementById('navbar-admin')
const navBarMembre = document.getElementById('navbar-membre')
const navBarEditor = document.getElementById('navbar-editor')

window.addEventListener('DOMContentLoaded', (e) => {
  const user = gestionJwt()
  if(user){
    switch(user.userRole){
      case "admin" : 
        navBarAdmin.classList.toggle('displayFlex')
        navBarMembre.classList.toggle('displayNone')
        navBarEditor.classList.toggle('displayNone')
        break
      case "editeur" : 
        navBarEditor.classList.toggle('displayFlex')
        navBarAdmin.classList.toggle('displayNone')
        navBarMembre.classList.toggle('displayNone')
        break
      case "membre" : 
        navBarMembre.classList.toggle('displayFlex')
        navBarAdmin.classList.toggle('displayNone')
        navBarEditor.classList.toggle('displayNone')
        break
    }
  }else{
    
    window.location.href="/"
  }
})
