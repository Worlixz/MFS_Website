let title;
let slug;
let resume;
let duration;
let author;
let premium;
let date;


const form = document.getElementById('form')

const imgFile = document.getElementById('imgFile')   
const title_article = document.getElementById('title')
const resume_article = document.getElementById('resume')
const duration_article = document.getElementById('duration')
const author_article = document.getElementById('author')
const premium_article_true = document.getElementById('premium_true')
const premium_article_false = document.getElementById('premium_false')
const date_parution = document.getElementById('date_parution')
const caractMax = document.getElementById('caractMax')
caractMax.innerHTML = 150

const editor = new EditorJS({
    holder: "editorjs",
    tools: {
        header: {
            class: Header,
            config : {
                placeholder: 'Mettre un titre',
                shortcut: 'CMD+SHIFT+h',
                levels: [1,2,3],
                defaultLevel: 1
            }
        },
        list: {
            class: List,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+l',
            config: {
                defaultStyle: 'unordered'
            }
        },
        quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+q',
            config: {
                quotePlaceholder: 'Enter a quote',
                captionPlaceholder: 'Quote\'s author',
            }
        },
        image: {
            class: ImageTool,
            config: {
                // En passant par cette méthode l'image est bien enregistré en local mais il n'u a aucun retour afin de EditorJS puisse prendre connaissance de l'upload de l'image
                endpoints: {
                    byFile: "http://localhost:3000/upload",
                    
                },
            }
        } 
    }
})


imgFile.addEventListener('change', (e) => {
    console.log(e)
})

title_article.addEventListener('change', (e) => {
    console.log('title : ',e.target.value)
    title = e.target.value
    slug = title.split(' ').join('-')
})
resume_article.addEventListener('change', (e) => {
    console.log('resume : ',e.target.value)
    resume = e.target.value
})

resume_article.addEventListener('input', (e) => {
    caractMax.innerHTML = 150 - e.target.value.length
})
duration_article.addEventListener('change', (e) => {
    console.log('duration : ',e.target.value)
    duration = e.target.value
})
author_article.addEventListener('change', (e) => {
    console.log('author : ',e.target.value)
    author = e.target.value
})
premium_article_true.addEventListener('input', (e) => {
    premium = e.target.value
    console.log('premium : ', premium)
})
premium_article_false.addEventListener('input', (e) => {
    premium = e.target.value
    console.log('premium : ', premium)
})

date_parution.addEventListener('change', (e) => {
    console.log('date_parution :',e.target.value)
    date = e.target.value
})



form.addEventListener('submit', (e) => {
    e.preventDefault()
    editor.save()
    .then(data => {
        let data_article = {
            title,
            slug,
            resume,
            editor : data,
            duration,
            author,
            premium,
            date
        }

        console.log(JSON.stringify(data_article))

        if(window.fetch){
            fetch(form.action, {
                method: "POST",
                body: JSON.stringify(data_article),
                headers: {
                    "Content-type": "application/json",
                    'Accept': "application/json"
                }
            })
            .catch(err => {
                console.log(err)
            })
        }else{
            console.log("Merci d'utiliser un navigateur à jour :) ")
        }
    })
})
