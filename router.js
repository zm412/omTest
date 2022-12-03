const { Router } = require("express")
const ActionController = require("./ActionController.js")

const router = new Router()
console.log(ActionController, 'CONTROLLER')

router.get('/cars', ActionController.getAll)
router.post('/cars', ActionController.create)
router.get('/cars/:id', ActionController.getOne)
router.put('/cars', ActionController.update)
router.delete('/cars/:id', ActionController.delete)

module.exports = router;
