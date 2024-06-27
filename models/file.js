const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const fileSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true
        },
        imageUrl: {
                type: String,
                required: true
        },
        tags: {
                type: String
        },
        email: {
                type: String,
        }

})

// send mail 
fileSchema.post("save", async function(doc) {
        try {
                console.log("doc", doc);
                // create transporter 
                let transporter = nodemailer.createTransport({
                        host: process.env.MAIL_HOST,
                        auth: {
                                user: process.env.MAIL_USER,
                                pass: process.env.MAIL_PASS
                        }
                })
                
                // send mail 
                let info = await transporter.sendMail({
                        from: process.env.MAIL_USER,
                        to: doc.email,
                        subject: "File uploaded successfully",
                        // text: "File uploaded successfully",
                        html: `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exciting News</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 0;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2c3e50;
            padding: 20px;
            text-align: center;
            color: #ffffff;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .hero {
            background: url('https://plus.unsplash.com/premium_photo-1683977922495-3ab3ce7ba4e6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center;
            background-size: cover;
            height: 200px;
            position: relative;
            overflow: hidden;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            transition: transform 0.5s ease;
        }
        .hero:hover {
            transform: scale(1.1);
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            margin: 20px 10px;
            padding: 12px 24px;
            background-color: #3498db;
            color: white;
            text-align: center;
            border-radius: 4px;
            text-decoration: none;
            font-size: 16px;
            transition: background-color 0.3s ease, transform 0.2s ease;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        .button:hover {
            background-color: #2980b9;
            transform: translateY(-2px);
        }
        .tags {
            padding: 20px;
            text-align: center;
        }
        .tags p {
            margin: 0 0 10px;
            font-size: 16px;
            color: #555555;
        }
        .tags span {
            display: inline-block;
            background-color: #ecf0f1;
            color: #555555;
            padding: 8px 16px;
            border-radius: 20px;
            margin: 5px;
            font-size: 14px;
            transition: background-color 0.3s ease;
        }
        .tags span:hover {
            background-color: #bdc3c7;
        }
        .footer {
            background-color: #34495e;
            text-align: center;
            padding: 20px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
        .footer p {
            margin: 0;
            font-size: 14px;
            color: #ffffff;
        }
        @media screen and (max-width: 600px) {
            .email-container {
                width: 100%;
                border-radius: 0;
                box-shadow: none;
            }
            .header h1 {
                font-size: 24px;
            }
            .content p {
                font-size: 14px;
            }
            .button {
                padding: 12px 20px;
                font-size: 14px;
            }
            .tags span {
                font-size: 12px;
                padding: 6px 12px;
            }
            .footer p {
                font-size: 12px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Exciting News, ${doc.name}</h1>
        </div>
        <div class="hero"></div>
        <div class="content">
            <p>You have successfully uploaded the image on cloudinary</p>
            <a href="${doc.imageUrl}" class="button">Explore Image</a>
            <a href="mailto:${'krishandevraj8@gmail.com'}" class="button">Contact Us</a>
        </div>
        <div class="tags">
            <p>Tags:</p>
            <span>${doc.tags}</span>
        </div>
        <div class="footer">
            <p>Thank you for being part of our community!</p>
        </div>
    </div>
</body>
</html>






                        `
                })

        } catch (error) {
                console.log(error);

        }
})

module.exports = mongoose.model('File', fileSchema)
