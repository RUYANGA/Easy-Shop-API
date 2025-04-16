import express from 'express'

import productRoute from './routes/products/index'

const port=3000

const app=express()
app.use(express.json())



app.use(productRoute)






app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})