const express = require('express')

const router = express.Router();

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    if(!req.session.user){ 
        req.session.user = { 
            id : username,
            pw : password, 
            name : username,
            authorized : true
        }

    }
    res.status(200).render("index", { username });
})

router.get('/logout', (req, res, next)=>{
    if(req.session.user){
        req.session.destroy()
    }
    res.status(200).render("index", { username : undefined })
})
module.exports = router;