const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
app.use(express.json());
const UserModel = require('./models/Users');
// const path = require('path');
// const PORT = process.env.PORT || 5000;
// const bodyParser = require('body-parser');

// const routes = require('./routes');
// const errorHandler = require('./middlewares/errorHandler');
// const { logger } = require('./middlewares/logger');
// const { corsOptions } = require('./config');
mongoose.connect('mongodb://127.0.0.1:27017/crud')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.post('/createUser', async (req, res) => {
    const { name, email, age } = req.body;
    const User = await UserModel.create({ name, email, age });
    res.send(User);
})

app.get('/users', (req, res) => {
    UserModel.find({})
        //res.send(users);
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, age } = req.body;
    UserModel.findByIdAndUpdate({ _id: id }, { name, email, age })
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndDelete(id)
        .then(() => res.json('User deleted'))
        .catch((err) => res.json(err));
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})