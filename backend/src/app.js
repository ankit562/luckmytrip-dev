import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes imports
import authUserRouter from "./routers/authUserRouter.js";
import ticketRouter from './routers/ticketRouter.js';
import productRouter from './routers/productRouter.js';



//routes declaration
app.use("/api/v1/auth" ,authUserRouter)
app.use("/api/v1/tickets" ,ticketRouter)
app.use("/api/v1/products" ,productRouter)



export {app}