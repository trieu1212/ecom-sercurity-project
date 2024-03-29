const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const AuthRoute = require('./routes/AuthRoute')
const UserRoute = require('./routes/UserRoute')
const ProductRoute = require('./routes/ProductRoute')


//config server
const app = express()
const PORT = process.env.PORT || 8080
dotenv.config()
app.use(bodyParser.json())
app.use(cors())
app.use(morgan("common"))
app.use(cookieParser())

//connect database
mongoose.connect(process.env.MONGODB_URI).then((res)=>{
    console.log("đã kết nối được database")
    app.listen(PORT, (req,res)=>{
        console.log(`server đang chạy trên port: ${PORT}`)
    })
})

//routes
app.use('/api/auth',AuthRoute)
app.use('/api/user',UserRoute)
app.use('/api/product',ProductRoute)