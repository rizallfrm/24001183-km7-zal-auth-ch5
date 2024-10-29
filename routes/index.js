const router = require("express").Router();

const User = require("./userRouter");

router.use("/users", User);

module.exports = router;
