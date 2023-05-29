let imgPres;
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


/* imgFile.addEventListener('change', (e) => {
    imgPres = imgFile
    console.log('imgPres : ',imgPres);
})
 */
title_article.addEventListener('change', (e) => {
    title = e.target.value
    slug = title.split(' ').join('-')
})
resume_article.addEventListener('change', (e) => {
    resume = e.target.value
})

resume_article.addEventListener('input', (e) => {
    caractMax.innerHTML = 150 - e.target.value.length
})
duration_article.addEventListener('change', (e) => {
    duration = e.target.value
})
author_article.addEventListener('change', (e) => {
    author = e.target.value
})
premium_article_true.addEventListener('input', (e) => {
    premium = e.target.value
})
premium_article_false.addEventListener('input', (e) => {
    premium = e.target.value
})

date_parution.addEventListener('change', (e) => {
    date = e.target.value
})



form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const image = imgFile.files[0]
    console.log('image : ', image);
    console.log('imgFile : ', imgFile);

    let formData = new FormData()
    formData.append('files', image, 'monImage')

    if(window.fetch){
        fetch("http://localhost:3000/uploadImg", {
            method: 'POST',
            headers: {'Content-Type':'multipart/form-data'},
            body: formData
        })
        .catch(err => console.log(err))
    }


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

        console.log(data_article)

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
