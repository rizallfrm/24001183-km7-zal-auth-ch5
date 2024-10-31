const router = require("express").Router();

const User = require("./userRouter");
const Car = require("./carRouter");

router.use("/users", User);
router.use("/cars", Car);

module.exports = router;
