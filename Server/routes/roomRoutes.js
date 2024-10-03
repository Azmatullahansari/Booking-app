const { Router } = require("express");
const { auth } = require("../middleware/authMiddlleware");
const { getRooms } = require("../controllers/roomController");
const { createRoom } = require("../controllers/roomController");
const { getRoom } = require("../controllers/roomController");
const { updatedRooms } = require("../controllers/roomController");
const { deletedRooms } = require("../controllers/roomController");
const router = Router();
//get all rooms
router.get("/", getRooms);
// create rooms
router.post("/", createRoom);
// get single room
router.get("/:id", getRoom);
// update room
router.put("/:id", updatedRooms);
//delete room
router.delete("/:id", deletedRooms);
module.exports = router;
