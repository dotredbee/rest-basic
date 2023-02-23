const express = require('express')
const { createServer } = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config()

const ejs = require('ejs')
const { PORT, MONGO_URI, SECRET_KEY_CS } = process.env

app.use(bodyParser.urlencoded({ extended  : false }))
app.use(express.static(path.join(__dirname, "./public")))
app.use(express.json())
app.use(cookieParser(SECRET_KEY_CS))
app.use(session({
    secret : SECRET_KEY_CS,
    resave : false,
    saveUninitialized : false,
    cookie : { 
        httpOnly : true,
        secure : false
    }
}))

app.set('view engine', 'ejs')



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
    if(req.session.user){
        res.status(200).render('index', { username : req.session.user.id })
    }else{
        res.status(200).render('index', { username : undefined })
    }
})


const httpServer = createServer(app)

httpServer.listen(PORT, () => {
    console.log(`server start...${PORT}`)
})