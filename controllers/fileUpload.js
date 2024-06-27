const File = require('../models/file')
const cloudinary = require('cloudinary').v2

exports.localFileUpload = async (req, res) => {
        try {
                // fetch file imageurl will be that you are using on postman while uploading images
                const file = req.files.imageUrl;
                console.log(file);
                let path = __dirname + "/files/" + Date.now() + `${file.name.slice(-4)}`
                console.log(path, "path");
                // let path1 = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`
                // move function call 
                file.mv(path, (err) => {
                        console.log(err);
                })
                res.json({
                        success: true,
                        message: 'File uploaded successfully'
                })

        } catch (error) {
                console.error(error);
                res.status(500).json({
                        success: false,
                        message: 'An error occurred during file upload'
                });
        }
}




// created fn for checking image extensions is matching with the required extension 
function checkImageExtensions(path, extension) {
      return  extension.includes(path)
}

async function uploadFileToCloudinary(file, folder){
        const options = {folder}
     return await cloudinary.uploader.upload(file.tempFilePath, options)
}

exports.imageUpload = async (req, res) => {
        try {
                // get all the data from request's body
                const { name, tags, email } = req.body;
                // get the image  req.files.imageUrl => imageUrl is the name that you have used when uploading
                const file = req.files.imageUrl;
                console.log(file, "file");

                // my extension will be 
                const extension = ["svg", "png", "jpeg"]

                // path of the file 
                const path = file.name.split('.')[1];

                if(!checkImageExtensions(path, extension)){
                        return res.status(400).json({
                                success: false,
                                message: 'Invalid image extension'
                        })
                }

                // upload the file to cloudinary 
             const response = await uploadFileToCloudinary(file, 'FileUpload')
             console.log("upload", response);

                // create enry in database 
                const fileData = await File.create({ name, imageUrl:response.secure_url, tags, email })
                console.log(fileData, "response");

                res.status(200).json({
                        message:"Upload successfully",
                        imageUrl: response.secure_url,
                        response: fileData,
                        success: true
                })          

        } catch (error) { 
                console.log(error);
                res.status(404).json({
                        message:"Upload failed",
                        success: false
                })
        }
}