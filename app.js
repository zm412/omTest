const express = require("express")
const mongoose = require("mongoose")
const router = require("./router.js" )
const nodeInterface = require("./nodeInterface.js" )

const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use('/api', router)

async function main() {
    const url = "mongodb+srv://zm412:335214ta@cluster0.589kf.mongodb.net"
    //const url = "mongodb+srv://name:passw@cluster0.589kf.mongodb.net"
    await mongoose.connect(url)
}

const nodeArgs = process.argv.slice(2)
if(nodeArgs.length > 0){
    nodeInterface(nodeArgs)
}


main()
// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async() => {

    await mongoose.disconnect()
    console.log("Приложение завершило работу")
    process.exit()
});

main().catch(console.log)
app.listen(3000)
