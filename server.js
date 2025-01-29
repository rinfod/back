/*
Autores: Norma, Galdina, Edú y Rolando
Fecha de creación: 17/01/2025
*/

const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');




const authRoutes = require('./routes/auth');

const routes = require('./routes/routes');
const routes_produccion = require('./routes/routes_produccion');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => {
    console.error('Error de conexión a MongoDB:', err);  // Agregar más detalles aquí
});

/*mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.log(err));*/

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', routes);
app.use('/prod', routes_produccion);

app.listen(5000, () => console.log('Servidor corriendo en http://localhost:5000'));
