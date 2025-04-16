import exprees,{Request,Response,NextFunction} from 'express'
import productRoute from './routes/products/index'

const port=3000

const app=exprees()



app.use(productRoute)





app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})