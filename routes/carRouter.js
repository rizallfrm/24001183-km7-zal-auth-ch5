const router = require("express").Router();
const carController = require("../controllers/carController");
const authMiddleware = require("../middleware/authMidlleware");


router.get("", carController.getAllCars);
router.post("/", authMiddleware, carController.createCars);

module.exports = router;
