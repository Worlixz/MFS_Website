export function conversionDate(elementDate){
    const parseDate = elementDate.split('T')[0]
    if(parseDate.indexOf('-') >= 0 ){
        const date_dest = parseDate.split('-')
        return date_dest[2] + ' / ' + date_dest[1] + ' / ' + date_dest[0]
    }else{
        return "Le trainement n'est pas bon"
    }
}

export function verificationDate(isoDate){
    let dateNow = Math.trunc(Date.now()/1000)
    const date_article = new Date(isoDate)
    const timestamp_article = date_article.getTime()/1000

    if(dateNow >= timestamp_article){
         return true
    }else{
        return false
    }
}

export function gestionAffichageCards(grid, element){
    const article = document.createElement('article')
            article.classList.add('cardsCours')
    
            const linkGlobal = document.createElement('a')
            if(element.premium){
                linkGlobal.href = ' '
                article.classList.add('disabled')
                linkGlobal.classList.add('disabledLink')
    
            }else {
                linkGlobal.href = '/cours/' + element.slug
            }
            
            // 1er div
            const title_img = document.createElement('div')
            title_img.classList.add('titleAndImgArticle')
            const img_article = document.createElement('img')
            img_article.src = '../../upload/pexels-errin-casano-2356087_1683112795437.jpg'
            const title_article = document.createElement('h3')
            title_article.innerHTML = element.title
    
            title_img.append(img_article, title_article)
    
            // 2ème div
            const synopsisArticle = document.createElement('div')
            synopsisArticle.classList.add('synopsisArticle')
            const resume_article = document.createElement('p')
            resume_article.textContent = element.resume
            resume_article.classList.add('resumeArticle')
    
            synopsisArticle.append(resume_article)
    
            // 3ème div
            const informationArticle = document.createElement('div')
            informationArticle.classList.add('informationArticle')
    
            const author_article = document.createElement('p')
            author_article.classList.add('text12')
            author_article.innerHTML = 'Auteur : ' + element.author
    
            const parution_article = document.createElement('p')
            parution_article.classList.add('text12')
            parution_article.innerHTML = 'Date de parution : ' + conversionDate(element.date)
    
            informationArticle.append(author_article, parution_article)
    
            //ajout de toutes les données dans le lien 
            linkGlobal.append(title_img, synopsisArticle, informationArticle)
            article.append(linkGlobal)
            grid.append(article)
}



export function callDataWithLog(urlApi){
    const token = document.cookie.split('=')[1]
    fetch(urlApi, {
        headers: {Authentication: `${token}`}
    })
    .then(resp => resp.json())
    .then(json => {
        const resJson = json
        if(!resJson.valid){
            document.location.href='/'
        }        
    })
    .catch(err => {
        console.log(err)
        document.location.href='/'
    })
}

export const parseJWT = () => {
    const token = document.cookie.split('=')[1]
    if(!token){
        return
    }if(token == "undefined"){
        return
    }
    else{
        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace("-", "+").replace("_","/")
        const jwtData = JSON.parse(window.atob(base64))
        const dateParsing = Math.trunc(Date.now()/1000)
        if(jwtData.exp > dateParsing){
            return jwtData
        }else{
            document.cookie = "access_token="
            return
        }
    }
}

export const jwtVerifyDate = (jwtData) => {
    new Promise((resolve, reject) => {
        if(jwtData){
            const test = "hello"
            return test
        }
        reject(console.log("gfdez"))
    })
    
}


export const parseJWTBis = () => {
    return new Promise((resolve, reject) => {
        const token = document.cookie.split('=')[1]
        if(token){
            const base64Url = token.split(".")[1]
            const base64 = base64Url.replace("-", "+").replace("_","/")
            resolve(JSON.parse(window.atob(base64)))
        }else{
            reject(console.log("pas de parsing"))
        }
        
    })
}

export const trainementCoursAndArticles = (data, containerZoneCours, titleCours, authorCours, dateCours, durationCours) => {
    console.log('data complet : ', data)
    titleCours.innerText = data.title
    authorCours.innerText = `Auteur : ${data.author}`
    dateCours.innerText = `Date : ${conversionDate(data.date)}`
    durationCours.innerText = `Durée : ${data.duration} min`

    data.editor.blocks.map(element => {
        const div = document.createElement('div')
        div.classList.add('divContainerCours')

        switch (element.type) {
            case 'header' :
                if(element.data.level === 1){
                    const titleOne = document.createElement('h1')
                    titleOne.innerText = element.data.text
                    div.classList.add('marginTitleCours')
                    div.append(titleOne)
                }
                if(element.data.level === 2){
                    const titleTwo = document.createElement('h2')
                    titleTwo.innerText = element.data.text
                    div.classList.add('marginTitleCours')
                    div.append(titleTwo)
                }
                if(element.data.level === 3){
                    const titleThree = document.createElement('h3')
                    titleThree.innerText = element.data.text
                    div.classList.add('marginTitleCours')
                    div.append(titleThree)
                }
                if(element.data.level === 4){
                    const titleFour = document.createElement('h4')
                    titleFour.innerText = element.data.text
                    div.classList.add('marginTitleCours')
                    div.append(titleFour)
                }
                break;
            case 'list' :
                const ul = document.createElement('ul')
                element.data.items.forEach(listItem => {
                    const li = document.createElement('li')
                    li.innerText = listItem
                    ul.append(li)
                })
                div.append(ul)
                break;
            case 'paragraph' : 
                const para = document.createElement('p')
                para.innerText = element.data.text
                div.classList.add('marginTop30')
                div.append(para)
                break 
            case 'image' : 
                const img = document.createElement('img')
                img.src = element.data.file.url
                div.classList.add('divContainerCoursImg')
                div.append(img)
                break
            case 'quote' :
                break
        }
        containerZoneCours.append(div)
        console.log(element)
    })
}