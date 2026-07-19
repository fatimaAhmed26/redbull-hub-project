// enabling images 
const cloudinary = require('../config/cloudinary')
const Listing = require('../models/redbull')
const uploadImage = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'redbull-hub/redbull',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )

    uploadStream.end(fileBuffer)
  })
}
const showNewForm=(req,res)=>{
    res.render('redbull/new.ejs')
}
// const uploadedImage = await uploadImage(req.file.buffer)
//     console.log(uploadedImage)
//     const listingData={}
//     listingData.price =req.body.price
//     listingData.streetAddress=req.body.streetAddress
//     listingData.city=req.body.city
//     listingData.size=req.body.size
//     listingData.owner= req.session.user._id
//     listingData.image={
//        url: uploadedImage.secure_url,
//     publicId: uploadedImage.public_id,
//     }
    module.exports={
        showNewForm
    }