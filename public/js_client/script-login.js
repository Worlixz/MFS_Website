const urlApi = 'http://localhost:8000/api/login'
const formulaire = document.getElementById('formLogin')
const btnLogin = document.getElementById('btn-login')



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
        .then(reponse => reponse.json())
        .then(reponse2 => {
            let date = new Date(Date.now() + 86400000); //86400000ms = 1 jour
            date = date.toUTCString();

            //Crée ou met à jour un cookie 'user'
            document.cookie = `user=${reponse2.data.u_name}; secure; expires=` + date;
            document.cookie = `userID=${reponse2.data.id}; secure; expires=` + date;
            document.cookie = `access_token=${reponse2.access_token}; secure; expires=` + date;

            return document.location.href="/dashboard"
        })
        
    })

})