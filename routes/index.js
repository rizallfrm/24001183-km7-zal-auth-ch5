const router = require("express").Router();

const User = require("./userRouter");
const Car = require("./carRouter");
const Auth = require("./authRouter");

router.use("/users", User);
router.use("/cars", Car);
router.use("/auth", Auth)

module.exports = router;
