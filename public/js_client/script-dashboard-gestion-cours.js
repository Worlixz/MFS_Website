import { conversionDate } from "./script-function.js"

const url = window.location.pathname
console.log(url)
const urlApiCourses = 'http://localhost:8000/api/dashboard/cours'
const urlApiArticles = 'http://localhost:8000/api/dashboard/articles'

const containerCards = document.getElementById('containerCards')
if(url === "/dashboard/cours"){
    console.log("Je suis dans la partie cours")
    fetch(urlApiCourses)
    .then(resp => resp.json())
    .then(data => {
        creationCards(data)
    })
}
if(url === "/dashboard/articles"){
    console.log("Je suis dans la partie articles")
    fetch(urlApiArticles)
    .then(resp => resp.json())
    .then(data => console.log(data))
}


function creationCards (data){
    data.map(element => {
        const divCards = document.createElement('div')
        divCards.classList.add('divCards')
        const divImg = document.createElement('div')
        divImg.classList.add('divImg')
        const divContent = document.createElement('div')
        divContent.classList.add('divContent')
        const divAuthDate = document.createElement('div')
        divAuthDate.classList.add('divAuthDate')
        const divBtn = document.createElement('div')
        divBtn.classList.add('divBtn')
        
        const imgCards = document.createElement('img')
        imgCards.src = '../css/assets/Rectangle 27-1.png'
        divImg.append(imgCards)


        const titleCards = document.createElement('h3')
        titleCards.innerText = element.title

        const resumeCards = document.createElement('p')
        resumeCards.innerText = element.resume

        const date = document.createElement('p')
        date.innerText = `Date : ${conversionDate(element.date)}`

        const author = document.createElement('p')
        author.innerText = `Auteur : ${element.author}`
        divAuthDate.append(author, date)
        divContent.append(titleCards, resumeCards, divAuthDate)

        const btnModif = document.createElement('button')
        btnModif.id = "btnModif"
        btnModif.onclick = (() => gestionBtn("Modif", element.slug))
        const lordIconModif = document.createElement('lord-icon')
        lordIconModif.src = "https://cdn.lordicon.com/wloilxuq.json"
        lordIconModif.trigger = "hover"
        lordIconModif.colors = "primary:#121331,secondary:#f28705"
        lordIconModif.style = "width:35px;height:35px"
        btnModif.append(lordIconModif)

        const btnDelete = document.createElement('button')
        btnDelete.id = "btnDelete"
        btnDelete.onclick = (() => gestionBtn("Delete", element.slug))
        const lordIconDelete = document.createElement('lord-icon')
        lordIconDelete.src = "https://cdn.lordicon.com/gsqxdxog.json"
        lordIconDelete.trigger = "hover"
        lordIconDelete.colors = "primary:#121331,secondary:#f28705"
        lordIconDelete.style = "width:35px;height:35px"
        btnDelete.append(lordIconDelete)
        divBtn.append(btnModif, btnDelete)

        divCards.append(divImg, divContent, divBtn)
        
        containerCards.append(divCards)
    })
}

function gestionBtn(typeBtn, slug){
    if(typeBtn == "Modif"){
        console.log("je suis dans le btn modif");
        console.log(slug)
        document.location.href = `/dashboard/cours/${slug}`
    }
    if(typeBtn == "Delete"){
        console.log("je suis dans le btn delete");
        console.log(slug)
        if(confirm("Es-tu sûr de vouloir supprimer le cours") == true){
            console.log("Je dois supprimer le cour");
        }

    }
}