const express = require("express");
require('../db/db');
const Customer = require('./Customer');

const app = express();
const port = 3001;
app.use(express.json());

// GET Customers API
app.get('/customers', (req, res) => {
    console.log(req.body)
    Customer.find().then((customers) => {
        if (customers.length !== 0) {
            res.json(customers);
        } else {
            res.status(400).send('Customer was not found');
        }
    })
})

// Find Customer By Id
app.get('/customers/:id', (req, res) => {
    //console.log(req.params);
    Customer.findById(req.params.id).then((customer) => {
        if (customer) {
            res.json(customer);
        } else {
            res.status(400).send('Customer was not found');
        }
    })
});

// Create new customer
app.post('/customers', (req, res) => {
    const newCustomer = new Customer({ ...req.body });
    console.log(newCustomer);
    newCustomer.save().then(() => {
        res.send('New customer was created Successfully');
    }).catch((err) => {
        res.send(err);
        res.status(500).send('Internal Server Error with customer post');
    })
});

// Delete customer
app.delete('/customer/:id', (req, res) => {
    Customer.findOneAndDelete(req.params.id).then((customer) => {
        if (customer) {
            res.json('Customer deleted Successfully');
        } else {
            res.status(400).send('Customer not found');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error with customer delete');
    })
});

app.listen(port, () => {
    console.log(`Customer Application is listening on port ${port}`)
})