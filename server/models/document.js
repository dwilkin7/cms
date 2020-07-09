var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String},
    description: {type: String, required: true},
    url: {type: String},
    children: [{type: mongoose.Schema.Types.ObjectId, ref: 'Document'}]

});

module.exports = mongoose.model('Document', documentSchema);