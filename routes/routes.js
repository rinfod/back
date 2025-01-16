
const express = require('express');
const Item = require('../models/models'); // Import the model

const router = express.Router();

// Rutas CRUD
router.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

router.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
});

router.put('/items/:id', async (req, res) => {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
});

router.delete('/items/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item eliminado' });
});

module.exports = router;
