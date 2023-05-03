import { verificationDate, gestionAffichageCards } from "./script-function.js"
const url = 'https://randomuser.me/api/?results=10'
const urlApi = 'http://localhost:8000/api/cours'

const grid = document.getElementById('grid')

window.addEventListener('DOMContentLoaded', (e) => {
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