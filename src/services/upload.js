const cloudinary = require('cloudinary');
const fs = require('fs-extra');

async function imgsUploader (file, folder){
   return await cloudinary.v2.uploader.upload(file, {resource_type: "auto", folder: folder}).then(data => {
        const URI = {
            public_id: data.public_id,
            url: data.secure_url
        }
        fs.unlinkSync(file)
        return URI
    }).catch(e => console.error(e))
}

async function deleteImages(publicId){
    try {
        return await cloudinary.v2.uploader.destroy(publicId)
    } catch (e) {
        throw e
    }
}

module.exports = {
    imgsUploader, 
    deleteImages
};