const mongoose = require('mongoose')
const recipeSchema = new mongoose.Schema({
description :{
    
},
rate:{

},
selectedFlavor:{

},
userId:{

},
},{timestamps:true})
const Recipe = mongoose.model('Recipe',recipeSchema)
module.exports = Recipe