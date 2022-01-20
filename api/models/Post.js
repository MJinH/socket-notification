const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    postImg: {
        type:Array,
        default: []
    }
})

module.exports = mongoose.model("Post",PostSchema)