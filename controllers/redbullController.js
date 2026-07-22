// enabling images 
const cloudinary = require('../config/cloudinary')
const Redbull = require('../models/redbull')

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
    redbullData.owner= req.session.user._id
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
  const index = async (req,res)=>{
    let allRedbulls = await Redbull.find()
    res.render('./redbull/index.ejs',{
          allRedbulls  
    
        } )

  }
const findRedbull= async(req,res)=>{
  const redbull = await Redbull.findById(req.params.id).populate('owner')
   res.render('./redbull/show.ejs',{
            redbull,
            
        })
}
const edit= async(req,res)=>{
  const redbull = await Redbull.findById(req.params.id)
     res.render('./redbull/edit.ejs',{
            redbull,
            
        })
}

    const update =async(req,res)=>{
      const redbull = await Redbull.findById(req.params.id)
        const oldPublicId = redbull.image?.publicId
        const redbullData={}
        redbullData.owner= req.session.user._id
    redbullData.flavor =req.body.flavor
    if(req.file){
        const uploadedImage = await uploadImage(req.file.buffer)
        redbull.image={
            url: uploadedImage.secure_url,
            publicId: uploadedImage.public_id,
        }
    }
    if(req.body.withSuger === 'on'){
        redbullData.withSuger =true

    }else{
        redbullData.withSuger = false
    }
        await Redbull.findByIdAndUpdate(req.params.id ,redbullData)
        res.redirect(`/redbulls/${req.params.id}`)
        
    }
    const deleteRedbull= async (req,res)=>{
       const redbull = await Redbull.findById(req.params.id)
       
       if (redbull.owner.equals(req.session.user._id)){
        await Redbull.findByIdAndDelete(req.params.id)
        res.redirect('/redbulls')
       }
    }

    module.exports={
        showNewForm,
        create,
        index,
        findRedbull,
        edit,
        update,
        deleteRedbull,

    }