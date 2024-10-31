const router = require("express").Router();

const { carController } = require("../controllers");

router.get("", carController.getAllCars);

module.exports = router;
