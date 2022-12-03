const Car = require("./Car.js")

class ItemService {

    async create(itemObject) {
        const createdItem = await Car.create(itemObject);
        console.log(createdItem, 'item')
        return createdItem;
    }

    async getAll() {
        const items = await Car.find();
        return items;
    }

    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const item = await Car.findById(id);

        return item;
    }

    async update(post) {
        if (!post._id) {
            throw new Error('не указан ID')
        }
        const updatedItem = await Car.findByIdAndUpdate(post._id, post, {new: true})

        return updatedItem;
    }

    async delete(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const item = await Car.findByIdAndDelete(id)

        return item
    }

    async sort(field, isReverse){
        const items = await Car.find();
        const sortedList = this.sortField(items, field, isReverse)
        return sortedList
    }

    async filter(obj) {
       const item = await Car.find(obj)

        return item
    }

     sortField(arr, field, isReverse){
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

}


module.exports = new ItemService()
