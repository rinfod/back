/*
Autores: Norma, Galdina, Edú y Rolando
Fecha de creación: 17/01/2025
*/

const mongoose = require('mongoose');

// Modelo
const ItemSchema = new mongoose.Schema({
    region: { type: String, required: true },
    distrito: { type: String },
    descripcion: { type: String },
    estadoNutricional: {
        desnutricion: { type: Number, required: true },  // Porcentaje de desnutrición
        normopeso: { type: Number, required: true },     // Porcentaje de peso normal
        sobrepeso: { type: Number, required: true },     // Porcentaje de sobrepeso
        obesidad: { type: Number, required: true }       // Porcentaje de obesidad
    }
});

// Export model
module.exports = mongoose.model('Item', ItemSchema);