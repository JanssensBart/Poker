require('dotenv').config()
const express =require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
const path = require("path")
const cookieParser = require('cookie-parser')
const serverPort = process.env.serverPort || 3500
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const mongoose = require('mongoose')

connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions));

// serve a simple server homepage over http
app.use('/', express.static(path.join(__dirname,"public")))
app.use('/', require("./Routes/root") )
app.use('/users', require('./routes/api/users'));
// this should be last 
app.all('*' , (req,res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views' ,"404.html"))
    } else if (req.accepts('json')) {
        res.json({message : "404 Not Found"})
    } else {
        res.type('txt').send('404 Not Found')
    }
});

// io server setup
const server = http.createServer(app)


// initialize io server
const io = new Server(server, {
    cors : {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    },
});





io.on("connection", (socket)=> {
    console.log(`user connected to ${socket.handshake.headers.host}`)

    socket.on('join' , (payload)=> {
        console.log(payload)

        
    })

    socket.on("disconnect", async () => {
        console.log(`user disconnected from ${socket.handshake.headers.host}`)
      });
})

mongoose.connection.once('open' , ()=> {
    console.log("Connected to MongoDB")
    server.listen( serverPort, ()=>{
        console.log(`Server is running on port: ${serverPort}`)
    });
})

mongoose.connection.on('error' , (error)=> {
    console.log(error)
})
