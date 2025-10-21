const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.ObjectId;

const reviewSchema = new mongoose.Schema(
    {
        game:{
            type: ObjectId,
            ref:"Game",
            required:true,
        },
        User:{
            type:User,
            required:true,
        },
        Review:{
            type:String,
            required: false,
            maxlegth: 300
        },
        stars:{
            type: Number,
            required: true,
            min:1,
            max:5
        }


    },
    {timestamps:true}
)

const Review = mongoose.model('Review',reviewSchema);
module.exports = Review;