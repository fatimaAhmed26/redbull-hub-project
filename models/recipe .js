const mongoose = require('mongoose')
const recipeSchema = new mongoose.Schema({
description :{
    type:String,
    required: true,
},
rate:{
    type:Number,
    required:true,
            min:0.
},
selectedFlavor:{
type:mongoose.Schema.Types.ObjectId,
ref:'Redbull'
},
userId:{
 type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        
},
},{timestamps:true})
const Recipe = mongoose.model('Recipe',recipeSchema)
module.exports = Recipe