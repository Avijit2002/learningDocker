const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})


app.get('/',(req,res)=>{
    res.send("Hello from express server running in docker container")
})

app.listen(3000)