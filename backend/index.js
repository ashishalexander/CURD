import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import adminRouter from './routes/admin.route.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log(err)
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/admin',adminRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode ||500
    const message = err.message || 'Internal server Error'
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    })
})

app.listen(3000, ()=>{
    console.log('Server listening on port 3000')
})
