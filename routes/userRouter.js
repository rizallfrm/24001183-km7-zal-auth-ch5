const router = require("express").Router();

const { userController } = require("../controllers");
const authenticate = require("../middleware/authMidlleware");

router.get("", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.post("", userController.createUser);
router.delete("/:id", userController.deleteUser);
// router.get("/current-user", authenticate, userController.getCurrentUser);

module.exports = router;
