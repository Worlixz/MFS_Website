import { verificationDate, gestionAffichageCards } from "./script-function.js"
const url = 'https://randomuser.me/api/?results=10'
const urlApi = 'http://localhost:8000/api/courses'

const grid = document.getElementById('grid')

window.addEventListener('DOMContentLoaded', (e) => {

    const rechercherCourses = document.getElementById('rechercherCourses')
    const searchCourses = document.getElementById('searchCourses')

    searchCourses.addEventListener('focus', (e) => {
        rechercherCourses.style.transform = 'translate(0,0)'
    })
    searchCourses.addEventListener('blur', (e) => {
        if(e.target.value !==''){
            rechercherCourses.style.transform = 'translate(0,0)'
        }else{
            rechercherCourses.style.transform = 'translate(15px, 48px)'
        }
    })



    let data_storage = sessionStorage.getItem('data')
    if(data_storage){
        JSON.parse(data_storage).forEach(element => {
            if(verificationDate(element.date)){
                console.log("J'affiche le cours");
            }else{
                console.log("Ce n'est pas le moment pour le cours");
            }
            gestionAffichageCards(grid, element)
            
        });
    }else{
        fetch(urlApi)
        .then((resp) => resp.json())
        .then( function(data){
            console.log(data)
            data.forEach(element => {
                
                if(verificationDate(element.date)){
                    console.log("J'affiche le cours");
                }else{
                    console.log("Ce n'est pas le moment pour le cours");
                }
                gestionAffichageCards(grid, element)
                
            });
            sessionStorage.setItem('data', JSON.stringify(data))
        })
        .catch((err) => console.log(err))
    }
})