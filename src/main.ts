import exprees,{Request,Response,NextFunction} from 'express'

const port=3000

const app=exprees()





app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})