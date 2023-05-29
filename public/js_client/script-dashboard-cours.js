import { gestionJwt } from './script-function.js'
const urlApi = 'http://localhost:8000/api/dashboard'
const container = document.getElementById('containerDashboardCandA')

const navbarDashbord = document.getElementById('navbar-dashbord')
const path = document.location.pathname.split('/')


function displayNavBarDashbord (navbarDashbord){
  const user = gestionJwt()

  const divNavLink = document.createElement('div')
  divNavLink.classList.add('divNavLink')
  const divNavBtn = document.createElement('div')
  divNavBtn.classList.add('divNavBtn')

  const homeLink = document.createElement('a')
  homeLink.href = '/dashboard'
  homeLink.innerText = 'Home'
  
  const gestionCoursLink = document.createElement('a')
  gestionCoursLink.href = '/dashboard/cours'
  gestionCoursLink.innerText = 'Gestion des cours'

  const gestionArticlesLink = document.createElement('a')
  gestionArticlesLink.href = '/dashboard/articles'
  gestionArticlesLink.innerText = 'Gestion des articles'

  const gestionUserLink = document.createElement('a')
  gestionUserLink.href = '/dashboard/users'
  gestionUserLink.innerText = 'Gestion des utilisateurs'

  const btnAdd = document.createElement('button')
  const lordBtnAdd = document.createElement('lord-icon')
  lordBtnAdd.src = "https://cdn.lordicon.com/mecwbjnp.json"
  lordBtnAdd.trigger = "hover"
  lordBtnAdd.colors = "primary:#121331,secondary:#ffffff"
  lordBtnAdd.style = "width:30px;height:30px"

  if(!user){
    window.location.href = '/login'
  }

  else if(user.userRole == "membre"){
    divNavLink.append(homeLink)
    navbarDashbord.append(divNavLink)

  }
  else if(user.userRole == "editeur"){
    divNavLink.append(homeLink, gestionCoursLink, gestionArticlesLink)
    divNavBtn.append(btnAdd)
    navbarDashbord.append(divNavLink, divNavBtn)

  }
  else if(user.userRole == "admin"){

    divNavLink.append(homeLink, gestionCoursLink, gestionArticlesLink, gestionUserLink)
    divNavBtn.append(btnAdd)
    if(path.includes('cours')){
      btnAdd.innerText = "Ajouter un cours"
      btnAdd.onclick = (() => {
        document.location.href = '/dashboard/cours-create'
      })
      btnAdd.append(lordBtnAdd)
      navbarDashbord.append(divNavLink, divNavBtn)
    }else if(path.includes('articles')){
      btnAdd.innerText = "Ajouter un articles"
      btnAdd.append(lordBtnAdd)
      navbarDashbord.append(divNavLink, divNavBtn)
    }
    else{
      navbarDashbord.append(divNavLink)
    }
  }
}

displayNavBarDashbord(navbarDashbord)