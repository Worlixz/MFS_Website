import { cookieGestion } from "./script-function.js"
const stringFetchAllUser = 'https://jsonplaceholder.typicode.com/users/1'
const pathname = location.pathname
const pathOnly = location.pathname.split('/')[1]


// Object contenant différentes fonction asynchrone
const callDB = {

    // Permet l'affichage du pseudo de l'utilisateur dans la nav bar
    async affichageUserNavBar () {
        const cookieMFS = document.cookie.split("MFS_Token_4a6d908a=")[1]
        try{
            // Appel une fonction qui décode le token sans toute fois vérifier l'intégrité
            // Mais cette fonction sert uniquement à afficher le pseudo, pas de risque de sécurité
            return cookieGestion.parsingCookie(cookieMFS)

        }catch (e) {
            console.log(e)
        }
    }, 

    disconnection () {
        document.cookie = "MFS_Token_4a6d908a="
        return window.location.href = '/'
    }
} 
    
const navbar = document.getElementById('navbar')
const left = document.getElementById('leftUl')
const leftB = document.getElementById('leftUlB')
const right = document.getElementById('rightUl')
const rightb = document.getElementById('rightUlB')
const checkbox = document.getElementById('check')
const allLinkB = document.getElementById('allLinkB')




const dataLink = [
    [
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
    ],
    [
        {
            name: "Profil",
            link: "/dashboard"
        },
        {
            name: "Déconnexion",
            link: "/"
        }
    ],
    [
        {
            name: "Connexion",
            link: "/login"
        },
        {
            name: "Inscription",
            link: "/signUp"
        }
    ]
    
]




async function creationNavBar (dataLink, navbar, left, leftB, right, rightb, checkbox, allLinkB) {
    const fctDataLink = dataLink

    fctDataLink[0].forEach(element => {
            const li = document.createElement('li')
            li.innerHTML = `<a class="linkNavBar" href="${element.link}">${element.name}</a>`
            const lib = document.createElement('li')
            lib.innerHTML = `<a class="linkNavBar" href="${element.link}">${element.name}</a>`
            leftB.append(lib)
            left.append(li)        
    });

    checkbox.addEventListener('change', (e) => {
        if(e.target.checked){
            allLinkB.classList.toggle('displayAllLinkB')
        }else{
            allLinkB.classList.toggle('displayAllLinkB')
        }
    })

    try{
        callDB
            .affichageUserNavBar()
            .then(user => {
                console.log("user dans le try : ",user)
                if(user){
                    const dataUser = `
                        <li><a class="linkNavBar" href="/dashboard">${user.userName
                        }</a></li>
                        <li><a id="btn-disconnection" class="linkNavBar">Déconnexion</a></li>
                    `
                    const dataUserB = `
                        <li><a class="linkNavBar" href="/dashboard">${user.userName
                        }</a></li>
                        <li><a id="btn-disconnection" class="linkNavBar">Déconnexion</a></li>
                    `

                    rightb.innerHTML = dataUserB
                    right.innerHTML = dataUser
                }else{
                    fctDataLink[2].forEach(element => {
                        if(element.link == "/signUp"){
                            const li = document.createElement('li')
                            li.innerHTML = `<a id="btn-signup" class="linkNavBar" href="${element.link}">${element.name}</a>`
                            const lib = document.createElement('li')
                            lib.innerHTML = `<a id="btn-signup" class="linkNavBar" href="${element.link}">${element.name}</a>`
                            rightb.append(lib)
                            right.append(li)
                        }else{
                            const li = document.createElement('li')
                            li.innerHTML = `<a class="linkNavBar" href="${element.link}">${element.name}</a>`
                            const lib = document.createElement('li')
                            lib.innerHTML = `<a class="linkNavBar" href="${element.link}">${element.name}</a>`
                            rightb.append(lib)
                            right.append(li)
                        }
                        
                    });
                }
            })

    }
    catch(e){

    }

}

creationNavBar(dataLink, navbar, left, leftB, right, rightb, checkbox, allLinkB)


window.addEventListener('DOMContentLoaded', (e) => {
    const linkDisconnection = document.getElementById('btn-disconnection')
    linkDisconnection.addEventListener('click', (e) => {
        callDB.disconnection()
    })
})