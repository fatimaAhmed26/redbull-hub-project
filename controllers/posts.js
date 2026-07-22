const cloudinary = require('../config/cloudinary')
const Recipe = require('./../models/recipe')
const Redbull= require("./../models/redbull")
const Post= require("./../models/post")
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

const create = async (req,res)=>{
  const uploadedImage = await uploadImage(req.file.buffer)
    postData={}
    postData.owner= req.session.user._id
    postData.description=req.body.description
    postData.image={
       url: uploadedImage.secure_url,
    publicId: uploadedImage.public_id,
    }
    let createPost= await Post.create(postData)
    res.redirect('/dashboard')
}
const showPosts= async (req,res)=>{
    const allPosts = await Post.find().populate('owner')
    res.render('posts.ejs',{
        allPosts
    })
}
module.exports={
    create,
    showPosts,

}