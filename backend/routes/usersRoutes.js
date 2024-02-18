const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser, getAllUsers, updateUser} = require("../controllers/usersController")
const { protect } = require("../middleware/authMiddleware")

router.get("/all", getAllUsers)
router.get('/user:id', getUser)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/account", protect, getUser)
router.put("/updateUser:id", updateUser)

module.exports = router