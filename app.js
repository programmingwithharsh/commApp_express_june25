const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });
require('./db/db');

const bookRoutes = require('./routes/books');
const customerRoutes = require('./routes/customers');
const productRoutes = require('./routes/products');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);

app.listen(port, () => {
    console.log(`Communication Application is listening on port ${port}`)
})