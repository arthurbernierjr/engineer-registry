require("dotenv").config()
const app= require("./app")
const db= require("./models/db")
const PORT=process.env.PORT||3000

db.once("open",()=>{
    console.log("Connected to mongo")
})

db.on("error",(error)=>{
    console.error(error.message)
})

app.listen(PORT, () => {
    console.log(`I was promised this code ${PORT} years ago`)
})

