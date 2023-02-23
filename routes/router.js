const express = require('express')

const router = express.Router()

router.get("/post", (req, res, next) => {
    res.status(200).render("post_create")    
})

module.exports = router;