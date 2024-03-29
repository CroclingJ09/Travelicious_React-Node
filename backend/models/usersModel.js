const mongoose = require("mongoose")

const usersSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Merci d'entre votre nom"],
        trim: true,
        minlength: [2, "Merci de mettre un prénom de plus de 2 caractères"]
    },
    last_name: {
        type: String,
        required: [true, "Merci d'entrer votre nom"],
        trim: true,
        minlength: [2, "Merci de mettre un nom de plus de 2 caractères"]
    },
    email: {
        type: String,
        required: [true, "Merci de remplir un email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Merci d'entrer un mote de passe"]
    },
    telephone: {
        type: String,
        required: [true, "Merci d'entrer un numéro valable"]
    },
    departure: {
        type: String,
        required: [true, "Merci de choisir une destination de départ"],
        default: "Genève"
    },
    nb_passengers: {
        type: Number,
        default: 1,
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Users', usersSchema)