const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())
app.use(express.static('static'))

const carScheme = new mongoose.Schema({
    brand: String,
    model: String,
    year: Date,
    color: String,
    price: Number,
    isClear: Boolean,
    registered: { type: Date, default: Date.now }, 
});

const Car = mongoose.model('Car', carScheme)

async function main() {
    //const url = "mongodb+srv://name:passw@cluster0.589kf.mongodb.net"
    await mongoose.connect(url)
}

function nodeArgsResponce(nodeArgs){
    const [ action ] = nodeArgs
    const currentArgs = nodeArgs.slice(1)

    if(action == 'show'){
        Car.find({})
            .then(doc => {
                doc.forEach(( car, index ) => {
                    console.log(newViewItem(car), "SHOWALL")
                })
            })
    }else if(action == 'showOne'){
        const id = currentArgs[0]
        Car.findById(id)
            .then(doc => console.log(newViewItem(doc), 'SHOWONE'))
    }else if(action == 'removeOne'){
        const id = currentArgs[0]
        Car.findByIdAndDelete(id)
            .then(doc => console.log(newViewItem(doc), 'REMOVEDONE'))
    }else if(action == 'removeMany'){
        currentArgs.forEach(id => {
            Car.findByIdAndDelete(id)
                .then(doc => console.log(newViewItem(doc), 'REMOVEDONEOFMANY'))
        })
    } else if(action == 'add'){
        const newCarData = {}
        currentArgs.forEach(param => {
            const newParam = param.split('=')
            const [key, value] = newParam
            newCarData[key] = value
        })
        const car = new Car(newCarData)
        car.save(err => {
            if(err){
                console.log(err, 'ERROR')
            }

            console.log('SAVED')
        })
    }else if(action == 'sort'){
        const field = currentArgs[0]
        const isReverse = currentArgs[1]
        console.log(currentArgs, 'ARGS')

        Car.find({})
           .then(doc => {
               const sortedList = sortField(doc, field, isReverse)
               sortedList.forEach(car => {
                   console.log(newViewItem(car), "SORTED_LIST")
               })
           })
    }else if(action == 'filter'){
        const newCarData = {}

        currentArgs.forEach(param => {
            const newParam = param.split('=')
            const [key, value] = newParam
            newCarData[key] = value
        })

        console.log(newCarData, 'NEWDATA')
        Car.find(newCarData)
            .then(doc => console.log(doc, 'DOC'))
    }

}

function newViewItem(obj){
    const {brand, model, year, color, price, isClear, registered} = obj 
    const newObj = {brand, model, year, color, price, isClear, registered}
    let newView = ''

    for(const key in newObj){
        if(newObj[key]){
            newView += key + ': ' + newObj[key] + ', '
        }
    }

    return newView
}

function sortField(arr, field, isReverse){
    let result
    if(['brand', 'model', 'color'].includes(field)){
        result = arr.sort((a, b) => {
            const stringA = a[field].toLowerCase()
            const stringB = b[field].toLowerCase()
            if(stringA < stringB){
                return -1
            }
            if(stringA > stringB){
                return 1
            }

            return 0
        })
        console.log(result, 'RESULT')
    }

    if(['year', 'registered'].includes(field)){
        result = arr.sort((a, b) => {
            const dateA = new Date(a[field]) 
            const dateB = new Date(b[field])
            return dateA - dateB
        })
    }
    
    if(field == 'price'){
         result = arr.sort((a, b) => {
            const priceA = a[field] 
            const priceB = b[field]
            return priceA - priceB 
        })
    }


    return isReverse ? result.reverse() : result
}


const nodeArgs = process.argv.slice(2)
if(nodeArgs.length > 0){
    nodeArgsResponce(nodeArgs)
}

app.use(function(request, response, next){
    const nodeArgs = process.argv.slice(2)
    console.log(nodeArgs, 'NODEARGS')
});

app.get("/", function(request, response){
    response.send("<h2>Привет Express!</h2>")
})

app.get("/api/cars", async (req, res)=>{
    const cars = await Car.find({});
    console.log(cars, 'cars')
    res.send(cars);
});

app.get("/api/cars/:id", async(req, res)=>{
    //console.log(req, 'req')

    const id = req.params.id;
    const car = await Car.findById(id);
    console.log(car, 'CAR')
    if(car) res.send(car);
    else res.sendStatus(404);
});

app.post("/api/cars", async (req, res) =>{

    if(!req.body) return res.sendStatus(400);
    console.log(req.body, 'BODY')

    const brand = req.body.brand;
    const model = req.body.model;
    const car = new Car({brand, model});
    await car.save();
    res.send(car);
});

app.delete("/api/cars/:id", async(req, res)=>{

    const id = req.params.id;
    console.log(req.params, 'PARAMS')
    const car = await Car.findByIdAndDelete(id);
    if(car) res.send(car);
    else res.sendStatus(404);
});

/*
app.put("/api/cars", jsonParser, async (req, res)=>{

    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const carName = req.body.name;
    const carAge = req.body.age;
    const newCar = {age: carAge, name: carName};
     // обновляем данные пользователя по id
    const car = await Car.findOneAndUpdate({_id: id}, newCar, {new: true});
    if(car) res.send(car);
    else res.sendStatus(404);
});

*/

main();
// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async() => {

    await mongoose.disconnect();
    console.log("Приложение завершило работу");
    process.exit();
});

main().catch(console.log)
app.listen(3000)
