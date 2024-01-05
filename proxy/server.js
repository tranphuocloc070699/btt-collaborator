
const express = require("express")
const app = express()
require("dotenv").config()
const path = require("path")

const cors = require("cors")
const corsOptions = {
    origin: 'http://localhost:8080',
  }

app.use(cors(corsOptions));
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, OPTIONS",
        "DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-Type"
    )
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})



app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = process.env.PORT || 5006


const {rootRouter} = require("./router/root.router")


// app.use(morgan("combined"))
app.use("/api/",rootRouter)
app.use(express.static(path.join(__dirname,"src/public")));

const pathPublicDirectory = path.join(__dirname, "../client/build");
app.use(express.static(pathPublicDirectory));
app.get("*", (req, res) => {
    res.sendFile(path.join(pathPublicDirectory, "index.html"))
})

// Root router 


app.listen(port,()=>{console.log(`Đang chạy ${port}`);})