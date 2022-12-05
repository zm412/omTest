const Car = require("./Car.js")
const ItemService = require("./ItemService.js")
const {newViewItem, sortField } = require('./helper.js')

class ActionController {
    getAll(req, res) {
        try {
            ItemService.getAll()
               .then(doc => {
                   doc.forEach(( car, index ) => {
                       console.log(newViewItem(car), "SHOWALL")
                   })
               })
        } catch (e) {
            console.log(e, 'ERROR')
        }
    }

    getOne(req, res) {
        try {
            const id = process.argv.slice(3)[0]
            ItemService.getOne(id)
                .then(doc => console.log(newViewItem(doc), 'SHOWONE'))
        } catch (e) {
            console.log(e, 'ERROR')
        }
    }

    create(req, res) {
        try {
            const currentArgs = process.argv.slice(3)
            console.log(currentArgs, 'NLJKLj')
            const newCarData = {}

            currentArgs.forEach(param => {
                const newParam = param.split('=')
                const [key, value] = newParam
                newCarData[key] = value
            })
            console.log(newCarData, 'newData')

            ItemService.create(newCarData)
                .then(doc => console.log(newViewItem(doc), 'ADD'))
                .catch(err => console.log(err, 'ERROR'))

        } catch (e) {
            console.log(e, "ERROR")
        }
    }

    delete(req, res) {
        try {
            const currentArgs = process.argv.slice(3)
            currentArgs.forEach(id => {
                ItemService.delete(id)
                    .then(doc => console.log('REMOVED'))
                    .catch(err => console.log(err, 'ERROR'))
            })
        } catch (e) {
            res.status(500).json(e)
        }
    }

    sort(req, res) {
        try {
            const currentArgs = process.argv.slice(3)
            const [ field, isReverse ] = currentArgs

            ItemService.getAll()
               .then(doc => {
                   const sortedList = sortField(doc, field, isReverse)
                   sortedList.forEach(car => {
                       console.log(newViewItem(car), "SORTED_LIST")
                   })
               })
            
        } catch (e) {
            res.status(500).json(e)
        }
    }

    filter(req, res) {
        try {
            const newCarData = {}
            const currentArgs = process.argv.slice(3)
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
        } catch (e) {
            res.status(500).json(e)
        }
    }
}


module.exports = new ActionController()
