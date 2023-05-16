const url = window.location.pathname
console.log(url)
const urlApiCourses = 'http://localhost:8000/api/dashboard/cours'
const urlApiArticles = 'http://localhost:8000/api/dashboard/articles'

if(url === "/dashboard/cours"){
    console.log("Je suis dans la partie cours")
    fetch(urlApiCourses)
    .then(resp => resp.json())
    .then(data => console.log(data))
}
if(url === "/dashboard/articles"){
    console.log("Je suis dans la partie articles")
    fetch(urlApiArticles)
    .then(resp => resp.json())
    .then(data => console.log(data))
}