require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const insertData = require('./routes/data');


//setting up databse connection
// mongoose.set("strictQuery", false);
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.log(err);
    }
}

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); //our file after submitting will be stored in uploads folder
    },
    filename: (req, file, cb) => {
        const fileName = file.fieldname + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({ storage });

// Serve the HTML form
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/upload', upload.single('excelFile'), insertData);

app.listen(port, async () => {
    await connectdb();
    console.log(`Server is running on port ${port}`);
});
