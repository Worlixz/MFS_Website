const urlApi = 'http://localhost:8000/api/cours'

const container = document.getElementById('containerDashboardCandA')

window.addEventListener('DOMContentLoaded', (e) => {
  console.log(e);

  fetch(urlApi)
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data)
  })
  .catch((err) => console.log(err))
})