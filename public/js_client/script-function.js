export function conversionDate(elementDate){
    if(elementDate.indexOf('-') >= 0 ){
        const date_dest = elementDate.split('-')
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

export function trainementCookie(cookie){
    const cookies = cookie.split(';')
    console.log(cookies);
    let cookieTraitement = {
        token: '',
        userID: '',
        userName: ''
    }
    cookies.forEach(element => {
        if(element.includes('access_token')){
            cookieTraitement.token = element.split('=')[1]
        }
        if(element.includes('userID')){
            cookieTraitement.userID = element.split('=')[1]
        }
        if(element.includes('userName')){
            cookieTraitement.userName = element.split('=')[1]
        }
    })
    return cookieTraitement
}

export function callDataWithLog(urlApi){
    const token = trainementCookie(document.cookie).token
    fetch(urlApi, {
        headers: {Authentication: `${token}`}
    })
    .then(resp => resp.json())
    .then(json => console.log(JSON.stringify(json)))
    .catch(err => {
        console.log(err)
        document.location.href='/'
    })
}

export const readCookie = () => {
    const cookie = document.cookie.split(';')
    let cookieTraitement = {
        token: '',
        userID: '',
        userName: ''
    }
    cookie.forEach(element => {
        if(element.includes('access_token')){
            cookieTraitement.token = element.split('=')[1]
        }
        if(element.includes('userID')){
            cookieTraitement.userID = element.split('=')[1]
        }
        if(element.includes('userName')){
            cookieTraitement.userName = element.split('=')[1]
        }
    })
    return cookieTraitement
}