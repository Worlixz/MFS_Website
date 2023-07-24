const urlPostImgPres = "http://localhost:3000/uploadimgpres"

const btn = document.getElementById('btnTest')
const input_file = document.getElementById('testFile')

btn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(e)

    const image = input_file.files[0]
    let formData = new FormData()
    formData.append('image', image)

    if(window.fetch){
        fetch(urlPostImgPres, {
            method: "post",
            body: formData
        })
    }
})
 