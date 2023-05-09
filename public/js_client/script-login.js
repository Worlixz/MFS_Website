
const urlApi = 'http://localhost:8000/api/login'
const formulaire = document.getElementById('formLogin')

window.addEventListener('DOMContentLoaded', (e) => {

    const input_email = document.getElementById('email')
    const input_pwd = document.getElementById('password')

    let email
    let pwd

    input_email.addEventListener('change', (e) => {
        email = e.target.value
        console.log(email)
    })
    input_pwd.addEventListener('change', (e) => {
        pwd = e.target.value
        console.log(pwd)
    })   

    formulaire.addEventListener('submit', (e) => {
        e.preventDefault()
        const bodyForm = {
            email,
            pwd
        }

        fetch(urlApi, {
                method: "POST",
                body: JSON.stringify(bodyForm),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            })
    })
})