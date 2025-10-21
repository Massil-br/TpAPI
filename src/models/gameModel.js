const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId;


const gameSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required : true,
            trim:true,
            minlenghth:3,
            maxlenghth:100,
            unique:true
        },
        description:{
            type: String,
            required : false,
            maxlength: 200
        },
        Owner:{
            type : ObjectId,
            ref:"User",
            required : true
        },
        isBorrowed:{
            type: Boolean,
            required : true,
            default: false,
        },
        Borrower:{
            type: ObjectId,
            ref:"User",
        }



    },
    {timestamps:true}
)


const Game = mongoose.model('Game', gameSchema);
module.exports = Game;