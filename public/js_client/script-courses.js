
window.addEventListener('DOMContentLoaded', (e) => {
    const rechercherCourses = document.getElementById('rechercherCourses')
    const searchCourses = document.getElementById('searchCourses')

    searchCourses.addEventListener('focus', (e) => {
        rechercherCourses.style.transform = 'translate(0,0)'
    })
    searchCourses.addEventListener('blur', (e) => {
        if(e.target.value !==''){
            rechercherCourses.style.transform = 'translate(0,0)'
        }else{
            rechercherCourses.style.transform = 'translate(15px, 48px)'
        }
    })
})