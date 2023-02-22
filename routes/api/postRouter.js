const express = require('express')

const router = express.Router();
const Post = require('../../models/post.model');
router.post("/create", (req, res, next) =>{ 
    Post.create(req.body)
        .then(post => res.status(200).render('index'))
        .catch(e => res.status(500).send(e))
    
})
router.get("/list", (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(e => res.status(500).send(e))
})
router.get("/:postId", (req, res, next) => { 
    Post.findOneByPostId(req.params.postId)
        .then(post => res.status(200).render('post', { post }))
        .catch(e => res.status(500).send(e))
    
})
router.get("/update/:postId", (req, res, next) => {
    Post.findOneByPostId(req.params.postId)
        .then(post => res.status(200).render('update', { post }))
        .catch(e => res.status(500).send(e))
})
router.post("/update", (req, res, next) => {
    const { postId } = req.body; 
    Post.updateByPostId(postId, req.body)
        .then(post => res.status(200).redirect(`/api/post/${postId}`))
        .catch(e => res.status(500).send(e))
})
router.delete("/:postId", (req, res, next) => {
    Post.deleteByPostId(req.params.postId)
        .then(() => res.status(200).render('index'))
        .catch(e => res.status(500).send(e))
})


module.exports = router