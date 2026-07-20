const mongoose = require('mongoose')
commentSchema =new mongoose.Schema({
    comment:{
        type:String,
        required: true,

    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        
},
name:{
type:String,
        required: true,
},
recipeId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Recipe'
},

})
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
ref:'Redbull',
},
userId:{
 type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        
},
comments :[commentSchema],

},{timestamps:true})
const Recipe = mongoose.model('Recipe',recipeSchema)
module.exports = Recipe