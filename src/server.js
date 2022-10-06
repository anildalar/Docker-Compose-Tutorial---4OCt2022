const express = require('express')
const app = express();
const env = require('dotenv');
const { Client } = require('pg')


env.config();

//DB Connection

const client = new Client({
    host: 'service2',
    user: 'oklabs',
    database: 'oklabs',
    password: 'mysecretpassword',
    port: 5432
})

const createTableText = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB
);
`
async function con(){
    await client.connect();
    await client.query(createTableText)
}
con();

app.get('/',async (req,res)=>{
    // create our temp table
    const newUser = { email: req.query.email }
    // create a new user
    await client.query('INSERT INTO users(data) VALUES($1)', [newUser])
    const { rows } = await client.query('SELECT * FROM users')
    console.log(rows)
    res.status(200).send('<h1>It Works!</h1>'+req.query.email);
});

let port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('listening on port ',port)
});

console.log("OK");