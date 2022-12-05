const express = require("express")
const mongoose = require("mongoose")
const router = require("./router.js" )
const dotenv = require("dotenv" )
const fetch = require("node-fetch")

const app = express()
dotenv.config()
app.use(express.json())
app.use(express.static('static'))
app.use('/', router)



const urlLocal = 'http://localhost:3000/'
const action = process.argv[2]
let urlRouting = action 
const resultUrl = urlLocal + urlRouting
console.log(resultUrl, 'resultURL')
fetch(resultUrl)


async function main() {
    //const url = "mongodb+srv://name:passw@cluster0.589kf.mongodb.net"
    const url = process.env.MONGODB_URL
    await mongoose.connect(url)
}



main()
process.on("SIGINT", async() => {

    await mongoose.disconnect()
    console.log("Приложение завершило работу")
    process.exit()
});

main().catch(console.log)
app.listen(3000)
