const express = require("express");
const cors = require('cors')
require('../db/db');

const Product = require('./Product');

const app = express();
app.use(cors());
const port = 4200;
app.use(express.json());

// To add new product in Mongodb
app.post('/product', (req, res) => {
    const newProduct = new Product({ ...req.body });
    newProduct.save().then(() => {
        res.status(201).json({ message: 'Product Created Successfully', data: newProduct });
    }).catch((error) => {
        res.status(500).json({ message: 'Error Creating Product', error: error.message });
    })
});

// To get all Products
app.get('/products', (req, res) => {
    Product.find().then((products) => {
        if (products.length !== 0) {
            res.json(products);
        } else {
            res.status(400).send('Product not found');
        }
    })
})

// Delete Product
app.delete('/product/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id).then((product) => {
        if (product) {
            res.json({ message: 'Product deleted Successfully' });
        } else {
            res.status(400).send('Product not found');
        }
    })
});

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})
