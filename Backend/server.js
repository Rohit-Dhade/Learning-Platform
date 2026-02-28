require('dotenv').config()
const app = require('./src/app')
const ConnectToDB = require('./src/config/database')

ConnectToDB()

app.listen(3000 , (req , res)=>{
    console.log("SERVER is running on port 3000");
})