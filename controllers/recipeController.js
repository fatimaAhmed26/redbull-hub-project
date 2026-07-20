const Recipe = require('./../models/recipe')
const Redbull= require("./../models/redbull")
const showNewForm=async(req,res)=>{
  const findFlavor= await Redbull.find()
  console.log(findFlavor[0].flavor);
    res.render('recipe/new.ejs',{findFlavor})
}
const create= async(req,res)=>{
    recipeData={}
    recipeData.owner= req.session.user._id
    recipeData.name= req.body.name
        // console.log(findFlavor);

    
    recipeData.selectedFlavor = req.body.selectedFlavor
    recipeData.description= req.body.description
    recipeData.rate=req.body.rate
    
    console.log(recipeData);
    
    let createRecipe= await Recipe.create(recipeData)
        console.log(recipeData);

        res.redirect('/recipes')
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