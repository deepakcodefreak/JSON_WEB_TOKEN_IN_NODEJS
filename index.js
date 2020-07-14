const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const postRoute = require('./routes/post')
dotenv.config();


    mongoose.connect(
        process.env.DB_CONNECT
    ,{useNewUrlParser:true,
    useUnifiedTopology:true},
()=>{
    console.log("Connected to DB")
})


app.use(express.json())



const authRoute = require('./routes/auth')


app.use('/api/user',authRoute)
app.use('/api/posts',postRoute)

app.listen(3000,()=>{
    console.log("Server running on Port 3000")
})