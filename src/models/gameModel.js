const mongoose = require('mongoose')


const gameSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required : true,
            trim:true,
            minlenghth:3,
            maxlenghth:100,
        },
        platform:{
            type: String,
            trim:true,
            required : true,
            maxlength: 50,
            minlength:2
        },
        genre:{
            type:String,
            require: true,
            trim:true,
            maxlength: 100,
            minlength:3
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