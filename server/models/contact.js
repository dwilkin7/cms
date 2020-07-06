var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    imageUrl: {type: String},
    group: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}]
    // sender: {type: Schema.Types.ObjectId, ref: 'Document'}

});

module.exports = mongoose.model('Contact', contactSchema);