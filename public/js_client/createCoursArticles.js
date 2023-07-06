const btnCours = document.getElementById('btnCours')
const btnArticle = document.getElementById('btnArticle')
const ctnDivCreate = document.getElementById('ctnDivCreate')
const formImg = document.getElementById('formImg')
const formCtn = document.getElementById('formContent')
const btnSubmit = document.getElementById('btnSubmit')


btnCours.addEventListener('click', (e) => {
    const typeBtn = e.target.value
    
    btnCours.classList.add('active')
    btnArticle.classList.remove('active')
    ctnDivCreate.classList.remove('displayNone')
    formImg.innerHTML = ""
    formImg.append(formImage(typeBtn))
    formCtn.innerHTML = ""
    formCtn.append(formContent(typeBtn))
    eventLister()
    
})


btnArticle.addEventListener('click', (e) => {
    const typeBtn = e.target.value
    
    btnCours.classList.remove('active')
    btnArticle.classList.add('active')
    ctnDivCreate.classList.remove('displayNone')
    formImg.innerHTML = ""
    formImg.append(formImage(typeBtn))
    formCtn.innerHTML = ""
    formCtn.append(formContent(typeBtn))
    eventLister()
    
})

function formImage (typeBtn) {
    const div = document.createElement('div')
    div.classList.add('divFormulaire')
    div.innerHTML = `
        <label for="imgFile" id="imgForm">Image de présentation ${typeBtn === "cours" ? "du cours" : "de l'article" }</label>
        <input class="marginTop15" type="file" id="imgFile" name="imgFile" accept="image/png, image/jpeg" required>
    `
    console.log(div)
    return div
}

function formContent (typeBtn) {
    const divGlobal = document.createElement('div')
    divGlobal.innerHTML = `
        <div class="divFormulaire">
            <label for="">Titre ${typeBtn === "cours" ? "du cours" : "de l'article"}</label>
            <input class="marginTop15" type="text" id="title" required>
        </div>
        <hr>
        <div class="divFormulaire">
            <label for="">Synopsis ${typeBtn === "cours" ? "du cours" : "de l'article"} : (caractères max : <span id="caractMax"></span>)</label>
            <textarea class="marginTop15" name="" id="resume" rows="4" cols="50" maxlength="150" required></textarea>
        </div>
        <hr>
        <div class="divFormulaire">
            <label for="">Contenu ${typeBtn === "cours" ? "du cours" : "de l'article"} :</label>
            <div class="marginTop15" id="editorjs"></div>
        </div>
        <hr>
        <div class="divRowsFormulaire">
            <div class="divFormulaire divFormDuration">
                <label for="">Durée de lecture estimé :</label>
                <input type="number" id="duration" required>
                <p>en min</p>
            </div>
            <div class="divFormulaire divFormAuthor">
                <label for="">Auteur :</label>
                <input type="text" id="author" required>
            </div>
        </div>
        <hr>
        <div class="divRowsFormulaire">
            <div class="divFormulaire">
                <label for="">Abonnement nécessaire :</label>
                <div>
                    <input class="inputRadioPremium" type="radio" name="premium" id="premium_true" value="true" required>
                    <label for="premium_true" style="font-weight: 400;">Oui</label>
                </div>
                <div>
                    <input class="inputRadioPremium" type="radio" name="premium" id="premium_false" value="false" required>
                    <label for="premium_false" style="font-weight: 400;">Non</label>
                </div>
            </div>
            <div class="divFormulaire">
                <label for="">Date de mise en ligne :</label>
                <input type="datetime-local" id="date_parution" required>
            </div>
        </div>
    `
    return divGlobal
}




function eventLister(){

    let title;
    let slug;
    let resume;
    let duration;
    let author;
    let premium;
    let date;

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

    title_article.addEventListener('change', (e) => {
        title = e.target.value
        slug = title.split(' ').join('-')
        console.log("title :", title, "slug : ", slug)
    })
    resume_article.addEventListener('change', (e) => {
        resume = e.target.value
        console.log("resume : ",resume)
    })
    
    resume_article.addEventListener('input', (e) => {
        caractMax.innerHTML = 150 - e.target.value.length
    })
    duration_article.addEventListener('change', (e) => {
        duration = e.target.value
        console.log("duration : ",duration)
    })
    author_article.addEventListener('change', (e) => {
        author = e.target.value
        console.log("author : ",author)
    })
    premium_article_true.addEventListener('input', (e) => {
        premium = e.target.value
        console.log("premium : ",premium)
    })
    premium_article_false.addEventListener('input', (e) => {
        premium = e.target.value
        console.log("premium : ",premium)
    })
    
    date_parution.addEventListener('change', (e) => {
        date = e.target.value
        console.log("date : ",date)
    })

    btnSubmit.addEventListener('click', (e) => {
        formImg.submit()
        /* formCtn.submit() */
    })

    formImg.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log(e)
    })
}
