const containerGridFormation = document.getElementById('containerGridFormation')

for (let i = 0; i < 16; i++) {

    const linkCards =  document.createElement('a')
    linkCards.classList.add('linkCards')
    linkCards.href = '/'

    const divCardsFormation = document.createElement('div')
    divCardsFormation.classList.add('divCardsFormation')
    
    const divTopCards = document.createElement('div')
    divTopCards.classList.add('divTopCards')
    const imgForma = document.createElement('img')
    imgForma.src = '../css/assets/Rectangle 27-5.png'
    divTopCards.append(imgForma)
    
    
    /* INFORMATION DE LA CARDS */
        /* PREMIERE PARTIE TITRE + TYPE DE FORMATION */
    const divBottomCards = document.createElement('div')
    divBottomCards.classList.add('divBottomCards')
    const divTitleCards = document.createElement('div')
    const typeFormation = document.createElement('h4')
    typeFormation.innerText = "BPJEPS"
    const titleFormation = document.createElement('h3')
    titleFormation.innerText = "Educateur sportif | Haltérophilie Musculation"
    divTitleCards.append(typeFormation, titleFormation)


    /* DEUXIEME PARTIE DE LA CARDS */
    const divInfosCards = document.createElement('div')
        /* GESTION DU NIVEAU DE LA FORMATION */
    const divlvlFormation = document.createElement('div')
    const imglvlForma = document.createElement('img')
    const lvlFormation = document.createElement('p')

    imglvlForma.src ='../css/assets/diploma-svgrepo-com.svg'
    lvlFormation.innerText = `Niveau BAC`
    divlvlFormation.append(imglvlForma, lvlFormation)

        /* GESTION DE LA DUR2E DE FORMATION */
    const divdurationFormation = document.createElement('div')
    const imgdurationFormation = document.createElement('img')
    const durationFormation = document.createElement('p')

    imgdurationFormation.src ='../css/assets/hourglass-svgrepo-com.svg'
    durationFormation.innerText = `Durée 6 mois`
    divdurationFormation.append(imgdurationFormation, durationFormation)





    divInfosCards.append(divlvlFormation, divdurationFormation)
    divBottomCards.append(divTitleCards, divInfosCards)

    
    divCardsFormation.append(divTopCards, divBottomCards)
    linkCards.append(divCardsFormation)
    containerGridFormation.append(linkCards)
}
