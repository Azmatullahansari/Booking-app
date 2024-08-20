const { Router } = require("express");
const { auth } = require("../middleware/authMiddlleware");
const { getUsers } = require("../controllers/userController");
const { createUser } = require("../controllers/userController");
const { userLogIn } = require("../controllers/userController");
const { logoutUser } = require("../controllers/userController");
const router = Router();
// get user
router.get("/", auth, getUsers);
// create user
router.post("/", createUser);
//login user
router.post("/login", userLogIn);
//logout user
router.get("/logout", logoutUser);

module.exports = router;
