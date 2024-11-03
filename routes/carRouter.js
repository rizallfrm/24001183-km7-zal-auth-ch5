const router = require("express").Router();
const carController = require("../controllers/carController");
const authenticate = require("../middleware/authMidlleware");


router.get("", carController.getAllCars);
router.post("", authenticate, carController.createCars);
router.put('/:id', authenticate, carController.updateCar);
router.delete('/:id', authenticate, carController.deleteCar);

module.exports = router;
