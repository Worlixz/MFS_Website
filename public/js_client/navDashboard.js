import { dashboardUser } from "./script-function.js";


const navbarDashboard = document.getElementById('navbarDashboard')
const dashboard = document.getElementById('dashboard')

const linkNavBarDashboard = [
    {
        name: "Profil",
        link: "/dashboard",
        role: ["membre", "editeur", "admin"]
    },
    {
        name: "Gestion des cours",
        link: "/dashboard/cours",
        role: ["editeur", "admin"]
    },
    {
        name: "Gestion des articles",
        link: "/dashboard/articles",
        role: ["editeur", "admin"]
    },
    {
        name: "Gestion des utilisateur",
        link: "/dashboard/users",
        role: ["admin"]
    }
]


// Nécessiter de connaitre les droits de l'utilisateur
dashboardUser.paramUser()
.then(user => {

    const role = user.userRule

    if(role === "membre"){
        const divMembre = document.createElement('div')
        navbarDashboard.innerHTML = `<p>Je suis un membre</p>`
    }
    
    if(role === "editeur"){
        const divLeft = document.createElement('div')
        divLeft.classList.add('navDashLeft')
        divLeft.append(creationNavDashBoard(linkNavBarDashboard, role))

        const divRight = document.createElement('div')
        divRight.classList.add('navDashRight')
        divRight.innerHTML = `<button id="addCoursArticles" type="button">Ajouter cours / articles</button>`

        navbarDashboard.append(divLeft, divRight)
    }
    
    if(role === "admin"){
        const divLeft = document.createElement('div')
        divLeft.classList.add('navDashLeft')
        divLeft.append(creationNavDashBoard(linkNavBarDashboard, role))

        const divRight = document.createElement('div')
        divRight.classList.add('navDashRight')
        divRight.innerHTML = `<button id="addCoursArticles" type="button">Ajouter cours / articles</button>`

        navbarDashboard.append(divLeft, divRight)
    }
})

function creationNavDashBoard(linkNavBarDashboard, role){
    
        const fctLinkDashboard = linkNavBarDashboard
        const fctRole = role
        const ul = document.createElement('ul')

        fctLinkDashboard.map(element => {
            if(element.role.includes(role)){
                const li = document.createElement('li')
                li.innerHTML = `<a href="${element.link}">${element.name}</a></li>`
                ul.append(li)
            }
        })
        return ul    

}

window.addEventListener('DOMContentLoaded', (e) => {
    const btn = document.getElementById('addCoursArticles')
    console.log(btn)
    btn.addEventListener('click', (e) => {
        window.location.href = "/dashboard/create"
    })

})