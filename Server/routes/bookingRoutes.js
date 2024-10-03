const { Router } = require("express");
const { auth } = require("../middleware/authMiddlleware");
const { getBookings } = require("../controllers/bookingController");
const { createBooking } = require("../controllers/bookingController");
const { updatedBookings } = require("../controllers/bookingController");
const { deletedBookings } = require("../controllers/bookingController");
const { getBooking } = require("../controllers/bookingController");
const router = Router();
//get all rooms
router.get("/", auth, getBookings);
// create bookings
router.post("/", createBooking);
//get single bookings
router.get("/:id", auth, getBooking);
// update bookings
router.put("/:id", auth, updatedBookings);
//delete bookings
router.delete("/:id", auth, deletedBookings);

module.exports = router;
