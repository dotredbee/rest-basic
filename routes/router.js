const express = require('express')

const router = express.Router()

router.get("/post", (req, res, next) => {
    res.status(200).render("post_create")    
})
router.get("/signin", (req, res, next) => {
    if(req.session.user) {
        const { id } = req.session.user
        res.status(200).render("index", { username : id })
    }else{
        res.status(200).render("signin", { username : undefined })
    }
})

module.exports = router;