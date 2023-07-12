const apiVerification = "http://localhost:8000/verificationUser"



module.exports = (req, res, next) => {

    let token
    const cookie = req.headers.cookie

    if(req.headers.cookie){
        token = req.headers.cookie.split("MFS_Token_4a6d908a=")[1]

        // Ajouter une potentiel vérification des droits pour accéder à certains URL
        verificationUser(token)
        .then(resp => {
            if(!resp){
                // Le nettoyage des cookies est gérée par la partie front grace au passage du paramètre
                return res.redirect('/login?redirection=true')
            }
            next()
        })
    }else{
        res.redirect('/login?redirection=true')
    }
}

async function verificationUser (token){
    const fctToken = token


    if(fctToken){
        try{
            return new Promise(resolve => {
              fetch(apiVerification, {
                headers: {Authentication: `${fctToken}`}
              })
              .then(resp => resp.json())
              .then(autorisation => {
                resolve(autorisation);
              })
            })
        }catch(e){
            return false
        }
      }
}