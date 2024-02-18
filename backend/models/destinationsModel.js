const mongoose = require("mongoose")

const destinationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Merci d'entrer le nom de la destination"],
        trim: true
    },
    country: {
        type: String,
        required: [true, "Merci d'entrer le pays"],
        trim: true
    },
    continent: {
        type: String,
        required: [true, "Merci d'entrer le continent"],
        trim: true
    },
    description:{
        type: String,
        required: [true, "Merci d'ajouter une description à la destination"],
        trim: true
    },
    attractions:{
        type: [],
        required: true,
        trim: true
    },
    images: {
        type: [],
        length: 4,
        trim: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Destinations', destinationSchema)