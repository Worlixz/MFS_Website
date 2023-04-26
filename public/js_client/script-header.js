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
})
