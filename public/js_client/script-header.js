import { parsingHeaderJwt } from './script-function.js'
import { navNoUSer, navWithUser, navBurgerNoUser, navBurgerWithUser } from './navbar.js'
const path = window.location.pathname.split('/')

// Premmier tableaux les liens de navigations
// Deuxième tableau les inscriptions ou connexion
// Troisème tableau la gestion du profil
const linkNavBar = [[
    {
        name: "Cours",
        link: "/courses"
    },
    {
        name: "Articles",
        link: "/articles"
    },
    {
        name: "Formations",
        link: "/lesFormation"
    }
],[
    {
        name: "Connexion",
        link: "/login"
    },
    {
        name: "Inscription",
        link: "/signup"
    }
],[
    {
        name: "Mon Profil",
        link: "/dashboard"
    }
]
    
]


const navbar = document.getElementById('navbar')
const linkLeft = document.getElementById('link-navbar')
const linkRight = document.getElementById('link-right-navbar')
console.log(linkLeft)
console.log(linkRight)




let titlePage 




const identification = document.getElementById('identification')
const userConnected = document.getElementById('userConnected')
const bvnUser = document.getElementById('bvn-user')
const bvnUserBurger = document.getElementById('bvn-user-burger')
const identificationBurger = document.getElementById('identificationBurger')
const userConnectedBurger = document.getElementById('userConnectedBurger')

// Cette fonction permet de modifier automatiquement le titre de la page en fonction de la page sur laquelle nous nous trouvons
function modification_title_page(path){
    if( path[1] == ''){
        return titlePage = 'Acceuil'
    }else{
        let str = path[1]
        str = str.charAt(0).toUpperCase() + str.slice(1);
        return titlePage = str
    }
}
document.title = `MFS - ${modification_title_page(path)}`

window.addEventListener('DOMContentLoaded', (e) => {
    Array.from(document.getElementsByClassName('a-navbar')).forEach(function(item){
        if(item.pathname === window.location.pathname){
            if(item.pathname === "/login" || item.pathname === "/signup"){
                return
            }else{
                item.classList.add('on_visited')
            }
        }else{
            item.classList.remove('on_visited')
        }
    })

    const navBurger = document.getElementById('hamburger')
    const checkboxHamburger = document.getElementById('check')
    const containerLinkBurger = document.getElementById('idContainerLinkBurger')
    const lordIconScroll = document.getElementById('lordIconScroll')
    checkboxHamburger.addEventListener('change', (e) => {
        console.log(e)
        if(e.target.checked){
            navBurger.style.height = '100vh'
            containerLinkBurger.style.display = 'flex'
            lordIconScroll.style.display = 'none'
        }else{
            navBurger.style.height = '60px'
            containerLinkBurger.style.display = 'none'
            lordIconScroll.style.display = 'block'
        }
    })

    
})
const user = await parsingHeaderJwt()


// Creation de la barre de navigation 
function gestionNavBarDesktop (linkNavBar, linkLeft, linkRight) {
    const fctLinkNavBar = linkNavBar

    fctLinkNavBar[0].forEach(element => {
        const li = document.createElement('li')
        li.innerHTML = `<a class="a-navbar" href="${element.link}">${element.name}</a>`
        linkLeft.append(li)
    });

    if(user){
        fctLinkNavBar[2].forEach(element => {
            const li = document.createElement('li')
            li.innerHTML = `<a class="a-navbar" href="${element.link}">${element.name}</a>`
            linkRight.append(li)
        });
    }else{
        fctLinkNavBar[1].forEach(element => {
            const li = document.createElement('li')
            li.innerHTML = `<a class="a-navbar" href="${element.link}">${element.name}</a>`
            if(element.name == "Inscription"){
                li.innerHTML = `<a class="a-navbar" id="btn-signup" href="${element.link}">${element.name}</a>`
            }else{
                li.innerHTML = `<a class="a-navbar" href="${element.link}">${element.name}</a>`
            }
            linkRight.append(li)
        });
    }

}

gestionNavBarDesktop(linkNavBar, linkLeft, linkRight)
