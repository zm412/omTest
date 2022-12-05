const express = require("express")
const mongoose = require("mongoose")
const router = require("./router.js" )
const dotenv = require("dotenv" )
const fetch = require("node-fetch")
const { newViewItem, currentArguments } = require('./helper.js')

const app = express()
dotenv.config()
app.use(express.json())
app.use(express.static('static'))
app.use('/', router)

const argumentList = process.argv.slice(2)
const action = process.argv[2]
const allActions = ['cars', 'oneCar', 'remove', 'addCar', 'filter', 'sort']

if(argumentList.length > 0 && allActions.includes(action)){

    const urlLocal = 'http://localhost:3000/'
    const urlId = action == 'oneCar' ? '/' + process.argv[3] : ''
    const resultUrl = urlLocal + action + urlId
    const params = currentArguments(process.argv.slice(3))

    fetch(resultUrl, params[action])
        .then(resp => resp.json())
        .then(doc => {
            if(action == 'remove'){
                console.log(doc, 'doc')
            }

            if(['cars', 'filter', 'sort'].includes(action)){
               doc.forEach(( car, index ) => {
                   console.log(newViewItem(car))
               })
            }

            if(['oneCar', 'addCar'].includes(action)){
               console.log(newViewItem(doc))
            }
        })
        .catch(err => console.log(err, 'ERROR'))
}

async function main() {
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
