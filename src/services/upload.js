const cloudinary = require('cloudinary');

 async function uploadImages(img){
    return await cloudinary.v2.uploader.upload(img, {folder: 'uploads'})
    .then(result => {
        var objImg = {
            public_id: result.public_id,
            url: result.secure_url
        }
        return objImg
    })
}

async function deleteImages(publicId){
    return await cloudinary.v2.uploader.destroy(publicId)
}

module.exports = {
    uploadImages, 
    deleteImages
};