const Recipe = require('./../models/recipe')
const Redbull= require("./../models/redbull")
const showNewForm=async(req,res)=>{
  const findFlavor= await Redbull.find()
    res.render('recipe/new.ejs',{findFlavor})
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
}



  const index = async (req,res)=>{
    let allRecipes = await Recipe.find()
    res.render('./recipe/index.ejs',{
          allRecipes  
    
        } )

  }
  const findRecipe= async(req,res)=>{
    const recipe = await Recipe.findById(req.params.id).populate('owner')
    const findFlavor= await Redbull.findById(recipe.selectedFlavor)
    
     res.render('./recipe/show.ejs',{
              recipe,
              findFlavor,
              
          })
  }
      const deleteRecipe= async (req,res)=>{
         const recipe = await Recipe.findById(req.params.id)
         
         if (recipe.owner.equals(req.session.user._id)){
          await Recipe.findByIdAndDelete(req.params.id)
          res.redirect('/recipes')
         }
      }
      const edit= async(req,res)=>{
        const recipe = await Recipe.findById(req.params.id)
        const findFlavor= await Redbull.find()
           res.render('./recipe/edit.ejs',{
                  recipe,
                  findFlavor,
                  
              })
      }
      const update = async(req,res)=>{
        const recipe = await Recipe.findById(req.params.id)
         recipeData={}
    recipeData.owner= req.session.user._id
    recipeData.name= req.body.name
    recipeData.selectedFlavor = req.body.selectedFlavor
    recipeData.description= req.body.description
    recipeData.rate=req.body.rate
    let updateRecipe= await Recipe.findByIdAndUpdate(req.params.id,recipeData)
    res.redirect(`/recipes/${req.params.id}`)
      }
module.exports={
    showNewForm,
    create,
    index,
    findRecipe,
    deleteRecipe,
    edit,
    update,

}