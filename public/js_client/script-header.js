import { trainementCookie } from './script-function.js'
const path = window.location.pathname.split('/')

let titlePage 

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

    const validCookie = trainementCookie(document.cookie)
    if(validCookie){
        console.log('v : ', validCookie)
    }else{
        console.log('v : ', validCookie)
    }
    
})
