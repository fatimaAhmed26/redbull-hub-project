// enabling images 
const cloudinary = require('../config/cloudinary')
const Redbull = require('../models/redbull')
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
const create = async (req,res)=>{
  const uploadedImage = await uploadImage(req.file.buffer)
    redbullData={}
    redbullData.flavor=req.body.flavor
        if(req.body.withSuger === 'on'){
        redbullData.withSuger =true

    }else{
        redbullData.withSuger = false
    }
    redbullData.image={
       url: uploadedImage.secure_url,
    publicId: uploadedImage.public_id,
    }
    let createRedbull= await Redbull.create(redbullData)
    res.redirect('/redbulls')
}

    module.exports={
        showNewForm,
        create,
    }