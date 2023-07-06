const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const postingImage = require('./public/je_serveur/functionPostImage')
const multer = require('./public/middleware/multer-config')
const auth_client = require('./public/middleware/auth_client')

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
app.get('/dashboard/cours', (req, res) => {
    res.render('dashboardAllElements')
})
app.get('/dashboard/cours/:id', (req, res) => {
    res.render('dashboardModifCours')
})
app.get('/dashboard/create', (req, res) => {
    res.render('dashboardCreate')
})
app.get('/dashboard/articles', (req, res) => {
    res.render('dashboardAllElements')
})
app.get('/dashboard/articles/create', (req, res) => {
    res.render('dashboardCreateArticles')
})
app.get('/dashboard/users', (req, res) => {
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
app.post('/upload', fileUpload() ,(req, res) => {
    const { image } = req.files
    console.log(image)
    postingImage(image, req,res)
    .then(data => {
        res.json(data)
    })
})

//utiliser multer pour la gestion des images via Fetch
app.post('/uploadImg',multer, (req, res) => {
    console.log('req.files : ', req.file);
})

app.listen(PORT, () => {
    console.log(`Je suis lancé sur le port : ${PORT}`)
})