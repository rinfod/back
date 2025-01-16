const mongoose = require('mongoose');

// Modelo
const ItemSchema = new mongoose.Schema({
    region: { type: String, required: true },
    distrito: { type: String },
    descripcion: {type: String},
});
//const Item = mongoose.model('Item', ItemSchema);

// Export model
module.exports = mongoose.model('Item', ItemSchema);