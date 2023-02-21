const express = require('express')
const { createServer } = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.urlencoded({ extended  : false }))
app.use(express.static(path.join(__dirname, "./public")))

app.get("/api/post/create", (req, res, next) =>{ 
    const { subject, author, content } = req.query;

    console.log(subject, author, content);

    res.status(200).send("create post")
})
app.post("/sign/login", (req, res, next) => { 
    const { username, password } = req.body;
    
    console.log(username, password);
    
    res.status(200).send("login");
})
app.use("/", (req, res, next) => { 
    console.log("hi")
    res.status(200).sendFile(__dirname + "/public/index.html")
})



const port = 8000;

const httpServer = createServer(app)

httpServer.listen(port, () => {
    console.log(`server start...${port}`)
})