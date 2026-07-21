const Recipe = require('../models/recipe')
const create = async(req,res)=>{
    const recipe =  await Recipe.findById(req.params.id)
    const commentData = {}
    commentData.comment = req.body.comment
    commentData.author = req.session.user._id
    recipe.comments.push(commentData)
    await recipe.save()
    res.redirect(`/recipes/${req.params.id}`)
}
module.exports={
    create,
}