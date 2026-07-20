const Recipe = require('./../models/recipe')
const Redbull = require('../models/redbull')

const showNewForm=(req,res)=>{
    res.render('recipe/new.ejs')
}
const create= async(req,res)=>{
    recipeData={}
    recipeData.owner= req.session.user._id
    recipeData.name= req.body.name
    recipeData.selectedFlavor = req.body.selectedFlavor
    recipeData.description= req.body.description
    recipeData.rate=req.body.rate
    let createRecipe= await Recipe.create(recipeData)
        res.redirect('/recipes')
        console.log(find(recipeData.selectedFlavor))
}
  const index = async (req,res)=>{
    let allRecipes = await Recipe.find()
    res.render('./recipe/index.ejs',{
          allRecipes  
    
        } )

  }
module.exports={
    showNewForm,
    create,
    index,
}