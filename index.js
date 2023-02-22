const express = require('express')
const { createServer } = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const ejs = require('ejs')




app.use(bodyParser.urlencoded({ extended  : false }))
app.use(express.static(path.join(__dirname, "./public")))
app.use(express.json())
app.set('view engine', 'ejs')

require('dotenv').config()

const { PORT, MONGO_URI } = process.env

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose
    .connect(MONGO_URI, { useNewUrlParser : true, useUnifiedTopology : true })
    .then(() => {
        console.log('success')
    })
    .catch(e => console.error(e));


const Post = require('./models/post.model');

app.post("/api/post/create", (req, res, next) =>{ 
    Post.create(req.body)
        .then(post => res.status(200).render('index'))
        .catch(e => res.status(500).send(e))
    
})
app.get("/api/post/list", (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(e => res.status(500).send(e))
})
app.get("/api/post/:postId", (req, res, next) => { 
    Post.findOneByPostId(req.params.postId)
        .then(post => res.status(200).render('post', { post }))
        .catch(e => res.status(500).send(e))
    
})
app.get("/api/post/update/:postId", (req, res, next) => {
    Post.findOneByPostId(req.params.postId)
        .then(post => res.status(200).render('update', { post }))
        .catch(e => res.status(500).send(e))
})
app.post("/api/post/update", (req, res, next) => {
    const { postId } = req.body; 
    Post.updateByPostId(postId, req.body)
        .then(post => res.status(200).redirect(`/api/post/${postId}`))
        .catch(e => res.status(500).send(e))
})
app.delete("/api/post/:postId", (req, res, next) => {
    Post.deleteByPostId(req.params.postId)
        .then(() => res.status(200).render('index'))
        .catch(e => res.status(500).send(e))
})


app.post("/sign/login", (req, res, next) => { 
    const { username, password } = req.body;
    res.status(200).send("login");
})

app.use("/", (req, res, next) => { 
    res.status(200).render('index')
})



const httpServer = createServer(app)

httpServer.listen(PORT, () => {
    console.log(`server start...${PORT}`)
})