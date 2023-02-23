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

const postRouter = require('./routes/api/postRouter')
const signRouter = require('./routes/sign/router')
const defaultRouter = require('./routes/router')

app.use('/api/post', postRouter);
app.use('/sign', signRouter)
app.use('/', defaultRouter)

app.use("/", (req, res, next) => { 
    res.status(200).render('index')
})


const httpServer = createServer(app)

httpServer.listen(PORT, () => {
    console.log(`server start...${PORT}`)
})