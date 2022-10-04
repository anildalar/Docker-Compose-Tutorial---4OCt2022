const express = require('express')
const app = express();
const env = require('dotenv');
env.config();


app.get('/',(req,res)=>{
    res.status(200).send('<h1>It Works2222</h1>');
});

let port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('listening on port ',port)
});

console.log("OK");