const express = require('express')
const {getUserBookings, setBooking, getBookingById, deleteBooking} = require("../controllers/bookingController");
const router = express.Router()

router.get("/userBookings:id", getUserBookings)
router.get("/booking:id", getBookingById)
router.post("/bookDestination", setBooking)
router.delete("/deleteBooking:id", deleteBooking)

module.exports = router