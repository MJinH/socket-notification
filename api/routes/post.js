const Post = require("../models/Post")
const router = require("express").Router()



router.get("/",async(req,res) => {
    try {
        const images = await Post.find({})
        res.status(200).json(images)
    } catch(err) {
        console.log(err)
    }
})

router.post("/", async(req,res) => {
    try {
        
        const post = await Post.findOne({username:req.body.username})
        if(!post) {
            const newPost = new Post(req.body)
            const postSave = await newPost.save()
            res.status(200).json(post)
        } else {
            const updatedPost = await post.updateOne({$push : {postImg: req.body.postImg}})
            res.status(200).json(updatedPost)
        }
    } catch(err) {
        res.status(500).json(err)
    }
})




module.exports = router