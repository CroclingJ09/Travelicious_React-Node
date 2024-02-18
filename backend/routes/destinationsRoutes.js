const express = require('express')
const {getAllDestinations, setDestinations, getDestinationById, updateDestination, deleteDestination} = require("../controllers/destinationsController");
const router = express.Router()

router.get("/all", getAllDestinations)
router.get("/destination:id", getDestinationById)
router.post("/addDestination", setDestinations)
router.put("/updateDestination:id", updateDestination)
router.delete("/deleteDestination:id", deleteDestination)

module.exports = router