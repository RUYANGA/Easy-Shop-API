import express ,{Request,Response,NextFunction,ErrorRequestHandler} from 'express'

import productRoute from './routes/products/product'
import userRouter from './routes/users/user'

const port=3000

const app=express()
app.use(express.json())



app.use(productRoute)
app.use(userRouter)





app.use((error:any,req:Request,res:Response,next:NextFunction):void=>{
    res.status(500).json({Error:error.message || 'Something went wronge'})
    return
})




app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})