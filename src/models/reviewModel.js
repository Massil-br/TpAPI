const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema(
    {
        gameId:{
            type: ObjectId,
            ref:"Game",
            required:true,
        },
        UserId:{
            type:ObjectId,
            required:true,
        },
        rating:{
            type: Number,
            required: true,
            min:1,
            max:5
        },
        comment:{
            type:String,
            required: false,
            maxlegth: 300
        },
    },
    {timestamps:true}
)

const Review = mongoose.model('Review',reviewSchema);
module.exports = Review;