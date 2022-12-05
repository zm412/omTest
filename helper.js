 
function newViewItem(obj){
    const {brand, model, color, price, isClear} = obj 
    const newObj = {brand, model, color, price, isClear}
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

            if(!a[field] || !a[field]){
                return 0
            }

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

function currentArguments(argsArr){
    const newCarData = {}

    currentArgs.forEach(param => {
        const newParam = param.split('=')
        const [key, value] = newParam
        newCarData[key] = value
    })

    return newCarData
}

module.exports = {newViewItem, sortField};
