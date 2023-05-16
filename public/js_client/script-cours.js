import { trainementCoursAndArticles } from './script-function.js'

const urlApi = 'http://localhost:8000/api/cours/'
const slug = document.location.pathname.split('/')[2]
const containerCoursAndArticles = document.getElementById('containerCoursAndArticles')
const containerZoneCours = document.getElementById('containerContent')

const titleCours = document.getElementById('titleCours')
const authorCours = document.getElementById('authorCours')
const dateCours = document.getElementById('dateCours')
const durationCours = document.getElementById('durationCours')

const btnShare = document.getElementById('btnShare')
const btnLike = document.getElementById('btnLike')


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

btnShare.addEventListener('click', e => {
    const urlShare = document.location.href
    console.log(urlShare)
    if(urlShare){
        navigator.clipboard.writeText(urlShare)
        .then(() => {
            alert('Url copié !')
        })
    }
})
btnLike.addEventListener('click', e => {
    console.log(e)
})
