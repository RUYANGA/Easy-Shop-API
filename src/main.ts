import dotenv from 'dotenv';
dotenv.config();

import express ,{Request,Response,NextFunction,ErrorRequestHandler} from 'express'
import cors from'cors'

import productRoute from './routes/products/product'
import userRouter from './routes/users/user'

const port=3000

const app=express();

app.use(cors({
    origin: 'https://venerable-llama-461baf.netlify.app',
    methods: ['GET', 'POST','DELETE','PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));
  
app.use(express.json());



app.use(productRoute);
app.use(userRouter);





app.use((error:any,req:Request,res:Response,next:NextFunction):void=>{
    res.status(500).json({Error: 'Something went wronge, Try again'})
    console.log(error.message)
    return
})




app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})