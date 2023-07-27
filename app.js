const express = require('express')
const cors = require('cors')
const multer = require('multer')
const auth_client = require('./public/middleware/auth_client');
const fs = require('fs')
const sharp = require('sharp');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./upload")
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.')
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name[0] + Date.now() + "." + extension)
    }
})
let upload = multer({storage : storage}).single('image')


const PORT = 3000
const app = express()

app.use(express.static('public'))
app.use('/upload', express.static(__dirname + '/upload'))
/* app.use(fileUpload()) */
app.use(express.json({limit: '50mb'}));
app.use(cors())

app.set('views', './public/views')
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index')
})

// DASHBOARD
app.get('/dashboard',auth_client , (req, res) => {
    res.render('dashboard')
})
app.get('/dashboard/cours',auth_client, (req, res) => {
    res.render('dashboardAllElements')
})
app.get('/dashboard/cours/:id',auth_client, (req, res) => {
    res.render('dashboardModifCours')
})
app.get('/dashboard/create',auth_client, (req, res) => {
    res.render('dashboardCreate')
})
app.get('/dashboard/articles',auth_client, (req, res) => {
    res.render('dashboardAllElements')
})
app.get('/dashboard/articles/create',auth_client, (req, res) => {
    res.render('dashboardCreateArticles')
})
app.get('/dashboard/users',auth_client, (req, res) => {
    res.render('dashboardGestionUsers')
})


/* GESTION DE CONNEXION ET INSCRIPTION */
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/signup', (req, res) => {
    res.render('signUp')
})

/* GESTION DES COURS ET ARTICLES LIBRE D ACCES */
app.get('/courses', (req, res) => {
    res.render('courses')
})
app.get('/cours/:id', (req, res) => {
    res.render('cours')
})
app.get('/articles', (req, res) => {
    res.render('articles')
})


/* GESTION DE LA PARTIE DES FORMATIONS */
app.get('/lesformation', (req, res) => {
    res.render('lesFormation')
})
app.get('/centre-de-formation', (req, res) => {
    res.render('centreFormation')
})
app.get('/employeurs', (req, res) => {
    res.render('employeur')
})


/* GESTION DES IMAGES */
app.listen(PORT, () => {
    console.log(`Je suis lancé sur le port : ${PORT}`)
})

app.post('/uploadimgpres', upload ,(req, res) => {
    upload(req, res, function(err, result){
        if(err){
            res.end("Erreur dans le téléchargement de l'image", err)
        }
        let url = req.file.path
        console.log("path : ", url)
        const data = {
            success: 1,
            file: {
                url
            } 
        }
        console.log(data)
        res.end("Le fichier est bien téléchargé")
        return url
    })
})

app.post('/uploadimgeditor', upload, function(req, res, next){
    postingWithEditor(req, res)
    .then(responseData => {
        res.json(responseData)
    })
})


async function postingWithEditor(req, res){
    return new Promise((resolve, reject) => {
        console.log(req)
        const url = req.file.path
        resizingSharp(url, 1200)
        .then(resp => {
            resolve({
                success: 1,
                file: {
                    url : "/" + resp
                }
            })
        })
    })
}

// Redimmensionnement des images avec SHARP
async function resizingSharp(path, width){
    // Gestion du nom du fichier :
    const fctPath = path
    
    const parts = path.split(/[\\/]/)

    const fileNameWithExtension = parts[parts.length - 1];
    const fileName = fileNameWithExtension.split('.')[0];
    const extension = fileNameWithExtension.split('.').pop();

    const fileNameFinal = fileName+"_small"+"."+extension

    const destFinal = "./upload/"+fileNameFinal

    // Gestion du redimmensionnement :
    await sharp(fctPath)
    .resize(width)
    .toFile(destFinal)
    .then(data => console.log(data))
    fs.unlink(fctPath, (err) => {
        if(err){
            console.error(err)
        }else{
            console.log("supp réussi")
        }
    })

    return destFinal
}

