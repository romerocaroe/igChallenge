const express = require('express')

const app = express()

app.get("/hello", (req,res) => { res.send("Hello World!")})

app.listen({ port: 8000 }, () => {
    console.log('http://localhost:8000')
})