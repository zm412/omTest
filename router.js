const { Router } = require("express")
const ItemService = require("./ItemService.js")
const router = new Router()
const ActionController = require("./ActionController.js")

router.get('/cars', ActionController.getAll)
router.get('/oneCar', ActionController.getOne)
router.get('/addCar', ActionController.create)
router.get('/delete', ActionController.delete)
router.get('/sort', ActionController.sort)
router.get('/filter', ActionController.filter)

module.exports = router;
