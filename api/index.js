const express = require("express")
const app = express()
const morgan = require("morgan")
const helmet = require("helmet")
const dotenv = require("dotenv")
const path = require("path")
const multer = require("multer")
const post = require("./routes/post")
const database = require("./db/database")
const cors = require("cors")
dotenv.config()


app.use(express.json())
app.use(morgan("common"))
app.use(helmet())


app.use(
    cors({
        origin: "*"
    })
)

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/post",post)

// Save img files
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"public/images")
    },
    filename: (req,file,cb) => {
        cb(null,req.body.name)
    }
})


const upload = multer({ storage: storage }).single("file");
app.post("/api/upload", upload, (req, res) => {
  try {
    return res.status(200).json("The image file has been saved");
  } catch (error) {
    console.error(error);
  }
});



// start sever
const start = async () => {
    try{
        await database(process.env.MONGO_URL)
                .then(console.log("Connected to DB"))
        app.listen(8800,() =>{
            console.log("Sever is running")
        })
    } catch(err) {
        console.log(err)
    }
}

start()