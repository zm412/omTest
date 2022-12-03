const Car = require("./Car.js")
const ItemService = require("./ItemService.js")

class ActionController {
    async create(req, res) {
        try {
            if(!req.body){
                return res.sendStatus(400)
            } 
            const item = await ItemService.create(req.body)
            console.log(item, 'item')
            res.json(item)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const item = await ItemService.getAll()
            return res.json(item)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {
            const post = await ItemService.getOne(req.params.id)
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            const updatedItem = await ItemService.update(req.body);
            return res.json(updatedItem);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const post = await ItemService.create(req.params.id);
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}


module.exports = new ActionController()
