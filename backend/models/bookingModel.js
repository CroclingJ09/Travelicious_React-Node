const mongoose = require("mongoose")


const bookingSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    city_from: {
        type: String,
        required: true,
        trim: true,
    },
    city_to: {
        type: String,
        required: true,
        trim: true
    },
    nb_passengers: {
        type: Number,
        required: true,
        default: 1
    },
    stops: {
        type: [],
        trim: true
    },
    departure_date: {
        type: Date,
        required: true,
    },
    return_date: {
        type: Date,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Bookings', bookingSchema)