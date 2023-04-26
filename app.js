const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const PORT = 3000
const app = express()

app.use(express.static('public'))
app.use('/upload', express.static(__dirname + '/upload'))
app.use(fileUpload())
app.use(express.json({limit: '50mb'}));
app.use(cors())

app.set('views', './public/views')
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index')
})
app.get('/dashbord', (req, res) => {
    res.render('dashbord')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/signup', (req, res) => {
    res.render('signUp')
})
app.get('/courses', (req, res) => {
    res.render('courses')
})
app.get('/articles', (req, res) => {
    res.render('articles')
})
app.get('/sa-formation', (req, res) => {
    res.render('saFormation')
})
app.get('/centre-de-formation', (req, res) => {
    res.render('centreFormation')
})
app.get('/employeurs', (req, res) => {
    res.render('employeur')
})

app.listen(PORT, () => {
    console.log(`Je suis lancé sur le port : ${PORT}`)
})