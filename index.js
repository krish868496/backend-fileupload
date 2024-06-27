const express = require("express")
const app = express();
const { dbConnect } = require("./config/database");
const fileUpload = require("express-fileupload")


require("dotenv").config();
const PORT = process.env.PORT || 3300

// start server 
app.listen(PORT, (req, res) => {
        console.log(`Starting at ${PORT}`);
})

// connected to database 
dbConnect()

// add middleware to parse middlewares
app.use(express.json());
app.use(fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
}))

// cloudinary connect 
const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();

// import routes 
const upload = require("./routes/fileUpload")
app.use('/api/v1', upload)

