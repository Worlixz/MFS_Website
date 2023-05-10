import { callDataWithLog } from './script-function.js'
const urlApi = 'http://localhost:8000/api/dashboard'
const container = document.getElementById('containerDashboardCandA')

window.addEventListener('DOMContentLoaded', (e) => {
  callDataWithLog(urlApi)
  

})
