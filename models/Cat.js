const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    nickname: { type: String },
    breed: { type: String },
    birthday: { type: Date },
    likesPets: { type: Boolean, required: true },
    description: { type: String, required: true},
    image: { type: String, required: true },
    humanName: { type: String }
}) 


const Cat = mongoose.model("Cat", catSchema)


module.exports = Cat