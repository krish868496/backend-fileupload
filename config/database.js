const mongoose = require('mongoose')

require('dotenv').config()
const DB_NAME = process.env.DB_NAME;
exports.dbConnect = async () => {
        mongoose.connect(DB_NAME).then((req, res) => {
                console.log('Connected to database')
        }).catch((err) => {
                console.log(`Failed to connect to database, error: ${err}`)
        })
}