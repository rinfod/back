const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('../routes/routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/obsano', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.log(err));

app.use('/api', routes);

app.listen(5000, () => console.log('Servidor corriendo en http://localhost:5000'));
