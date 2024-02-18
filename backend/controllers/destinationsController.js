const asyncHandler = require('express-async-handler')
const Destinations = require('../models/destinationsModel')
const {json} = require("express");


//@desc Get all Destinations
//@route GET /api/destinations/all
//Access public
const getAllDestinations = asyncHandler(async (req, res) => {
    const destinations = await Destinations.find()
    res.status(200).json(destinations)
})

//@desc Get destinations by Id
//@route GET /destinations/id
//Access public
const getDestinationById = asyncHandler(async (req, res) => {
    const destination = await Destinations.findById(req.params.id)
    if (destination){
        res.status(200).json(destination)
    } else{
        res.status(401)
        throw new Error("Cette destination n'existe pas")
    }
})

//@desc Set Article
//@route POST /api/destinations/add
//Access private
const setDestinations = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.country || !req.body.continent || !req.body.description || !req.body.attractions) {
        res.status(400)
        throw new Error('Merci de remplir tous les champs')
    }

    //check if destination exist
    const destinationExist = await Destinations.findOne({name: req.body.name})
    if (destinationExist){
        res.status(400)
        throw new Error("Cette destination existe déjà")
    }

    let listAttractions = []
    let attractions = req.body.attractions
    if (attractions) {
        Object.values(attractions).forEach(att => listAttractions.push(att));
    } else {
        listAttractions = []
    }


    const destination = await Destinations.create({
        name: req.body.name,
        country: req.body.country,
        continent: req.body.continent,
        description: req.body.description,
        attractions: listAttractions,
        images: req.body.images
    })

    if (destination){
        res.status(200).json(destination)
    } else{
        res.status(400)
        throw new Error('Une erreur est survenue, réessayez')
    }
})

//@desc Update Destination
//@route PUT /api/destination:id
//Access private
const updateDestination = asyncHandler(async (req,res) => {
    const destination = await Destinations.findById(req.params.id)

    if(!destination){
        res.status(400)
        throw new Error("Cette destination n'existe pas")
    }

    const updatedDestination = await Destinations.findByIdAndUpdate(req.params.id, req.body, {new:true})

    if (updatedDestination){
        res.status(200).json({id: req.params.id})
    } else{
        res.status(400)
        throw new Error('Une erreur est survenue, réessayez')
    }
})

//@desc Delete Destination
//@route DELETE /api/destination/deleteDestination:id
//Access private
const deleteDestination = asyncHandler(async (req,res) => {

   const destination = await Destinations.findById(req.params.id)
    if (!destination) {
        res.status(400)
        throw new Error ("Cette destination n'existe pas")
    }

    // if (req.user.admin === false) {
    //     res.status(403)
    //     throw new Error ("Vous n'avez pas les droits d'effectuer cette action")
    // }

    await Destinations.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getAllDestinations,
    getDestinationById,
    setDestinations,
    updateDestination,
    deleteDestination
}