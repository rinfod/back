/*
Autores: Norma, Galdina, Edú y Rolando
Fecha de creación: 17/01/2025
*/

const mongoose = require('mongoose');

// Modelo
const ItemSchema = new mongoose.Schema({
    tipo: { type: String, required: true },
    nombre: { type: String },
    resumen: {type: String},
    autor: {type: String},
});

// Export model
module.exports = mongoose.model('Produccion', ItemSchema);