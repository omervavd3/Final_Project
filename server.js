//port
const PORT = 8080;

//express
const express = require('express')
const app = express()

//for cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//for mongoDB
const mongoose = require('mongoose')

//for .env
require('dotenv').config();

//static files 
app.use(express.static('public'));

//to be able to get data from client add this line
app.use(express.json());

//mongoose connection
const uri = process.env.MONGO_URI; 

async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

connectDB();

//routes
const userRouter = require('./routes/userRoutes');
const productRouter = require("./routes/productRoutes");
const userProductRouter = require("./routes/userProductRoutes");
const purchaseRouter = require('./routes/purchaseRoutes')
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/userProduct', userProductRouter);
app.use('/purchase', purchaseRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});