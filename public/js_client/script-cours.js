import { trainementCoursAndArticles } from './script-function.js'

const urlApi = 'http://localhost:8000/api/cours/'
const slug = document.location.pathname.split('/')[2]
const containerCoursAndArticles = document.getElementById('containerCoursAndArticles')
const containerZoneCours = document.getElementById('containerContent')

const titleCours = document.getElementById('titleCours')
const authorCours = document.getElementById('authorCours')
const dateCours = document.getElementById('dateCours')
const durationCours = document.getElementById('durationCours')


const urlValid = urlApi + slug

console.log(slug);

fetch(urlValid)
.then(resp => resp.json())
.then((data) => {
    trainementCoursAndArticles(
        data, 
        containerZoneCours, 
        titleCours,
        authorCours,
        dateCours,
        durationCours,
        )
})

