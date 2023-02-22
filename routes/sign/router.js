const express = require('express')

const router = express.Router();

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    res.status(200).send("login");
})
module.exports = router;