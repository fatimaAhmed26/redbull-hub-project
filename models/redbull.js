const mongoose = require('mongoose')
const redbullSchema = new mongoose.Schema({
flavor:[{
    type:String,
    required: true,
}],
withSuger:{
 type: Boolean,
},
image:{
        url:{
            type :String,
            required : true,
        },
        publicId:{
            type: String,
            required : true
        }
    },
       owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
},{timestamps:true})
const Redbull = mongoose.model('Redbull',redbullSchema)
module.exports = Redbull