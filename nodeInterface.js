const ItemService = require("./ItemService.js")

function nodeInterface(nodeArgs){
    const [ action ] = nodeArgs
    const currentArgs = nodeArgs.slice(1)

    if(action == 'show'){
        ItemService.getAll()
            .then(doc => {
                doc.forEach(( car, index ) => {
                    console.log(newViewItem(car), "SHOWALL")
                })
            })
    }else if(action == 'showOne'){
        const id = currentArgs[0]
        ItemService.getOne(id)
            .then(doc => console.log(newViewItem(doc), 'SHOWONE'))

    }else if(action == 'delete'){
        currentArgs.forEach(id => {
            ItemService.delete(id)
                .then(doc => console.log(newViewItem(doc), 'REMOVE'))
        })
    }else if(action == 'add'){
        const newCarData = {}
        currentArgs.forEach(param => {
            const newParam = param.split('=')
            const [key, value] = newParam
            newCarData[key] = value
        })
        ItemService.create(req.body)
            .then(doc => console.log(newViewItem(doc), 'ADD'))
            .catch(err => console.log(err, 'ERROR'))
        
    }else if(action == 'sort'){
        const field = currentArgs[0]
        const isReverse = currentArgs[1]
        console.log(currentArgs, 'ARGS')

        ItemService.sort(field, isReverse)
           .then(doc => {
               doc.forEach(car => {
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

        ItemService.filter(newCarData)
            .then(doc => {
               doc.forEach(car => {
                   console.log(newViewItem(car), "FILTERED_LIST")
               })
            })

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

module.exports = nodeInterface
