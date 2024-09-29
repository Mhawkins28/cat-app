const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({ 
    comment: { type: String, require: true},
    uploadedBy: { type: String, default: "Guest" },
    createdAt: { type: Date, default: Date.now }
})


const catSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    nickname: { type: String },
    breed: { type: String },
    birthday: { type: Date },
    likesPets: { type: Boolean, required: true },
    description: { type: String, required: true},
    image: { type: String, required: true },
    humanName: { type: String },
    comments: [commentSchema]
}) 


const Cat = mongoose.model("Cat", catSchema)


module.exports = Cat