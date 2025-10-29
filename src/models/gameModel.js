const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId;


const gameSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required : true,
            trim:true,
            minlenghth:3,
            maxlenghth:100,
            unique:true
        },
        platform:{
            type: String,
            required : true,
            maxlength: 50
        },
        genre:{
            type:String,
            require: true,
            maxlength: 100,
        },
        status:{
            type:String,
            required:true,
            enum:["available", "borrowed", "playing"],
            default:"available",
        },
        ownerId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        borrowedBy:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        borrowedAt:{
            type:Date
        }
    },
    {timestamps:true}
)


const Game = mongoose.model('Game', gameSchema);
module.exports = Game;