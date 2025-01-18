/*
Autores: Norma, Galdina, Edú y Rolando
Fecha de creación: 17/01/2025
*/

const express = require('express');
const Produccion = require('../models/produccion'); // Import the model

const router = express.Router();

// Rutas CRUD
router.get('/produccion', async (req, res) => {
    const produccion = await Produccion.find();
    res.json(produccion);
});

// Ruta para buscar lugares por distrito
router.get('/produccion', async (req, res) => {
    console.log('consulta')
    const { tipo } = req.query;
  
    try {
      // Buscar documentos donde el campo "district" coincida con el valor proporcionado
      const produccion = await Produccion.find({ tipo: new RegExp(tipo, 'i') });
      res.json(produccion);
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar lugares', error });
    }
  });

router.post('/producciones', async (req, res) => {
    console.log('creado')
    const newProduccion = new Produccion(req.body);
    await newProduccion.save();
    res.json(newProduccion);
});

router.put('/producciones/:id', async (req, res) => {
    const updatedProduccion = await Produccion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduccion);
});

router.delete('/producciones/:id', async (req, res) => {
    await Produccion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producción eliminado' });
});

module.exports = router;