const sharp = require('sharp')

function postingImage(image, req, res){
    return new Promise((resolve, reject) => {


            if(!image){
                console.log("il n'y a pas d'image")
                reject(res.sendStatus(400))
            }

            if(!image.mimetype.startsWith('image')){
                console.log("Ce n'est pas une image")
                reject(res.sendStatus(400))
            }

            if(image.mimetype.startsWith('image')){
                console.log("J'ai une image", image)

                const destructuring = image.name.split('.')

                const name = destructuring[0].split(' ').join('_')
                const ext = destructuring[1]

                image.name = (name + '_' + Date.now() + '.' + ext)
                const url = '/upload/' + image.name

                image.mv(process.cwd() + '/upload/' + image.name)

                resolve({
                    success: 1,
                    file: {
                        url
                    }
                })
            }
        })
}

module.exports = postingImage