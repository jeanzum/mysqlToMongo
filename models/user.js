var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    id: {
        type: Number
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    document_type: {
        type: String
    },
    document_number: {
        type: String
    },
    phone: {
        type: String
    },
    birthdate: {
        type: String
    },
    email: {
        type: String
    },
    pass: {
        type: String
    },
    department: {
        type: String
    },
    city: {
        type: String
    },
    childs_count: {
        type: Number
    },
    childs_info: {
        type: String
    },
    terms: {
        type: Boolean
    },
    contrat: {
        type: Boolean
    },
    subscribe: {
        type: Boolean
    },
    park: {
        type: String
    },
    cards: {
        type: String
    },
    registered_at: {
        type: String
    }
}, {versionKey: false});

module.exports = mongoose.model('users', userSchema);
