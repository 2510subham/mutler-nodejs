const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const detailsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    phone: {
        type: Number,
        required: true,
    },
    Date_of_birth: {
        type: Date,
    },
    work_experience: {
        type: String,
    },
    resume_title: {
        type: String,
    },
    current_location: {
        type: String,
    },
    postal_address: {
        type: String,
    },
    current_employer: {
        type: String,
    },
    current_designation: {
        type: String,
    },
})
const Details = mongoose.model('excelData', detailsSchema);
module.exports = Details;



