const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


const URI = process.env.MONGODB_URI || 'mongodb://localhost/OverBoiled'

mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => console.log(`Connected to ${x.connections[0].name}`))
    .catch(() => console.error("Error connecting to Mongo"))



app.use(cors()) //for CORS
app.use(express.json()) //for req.body
app.use(`/api`, require('./routes')) //Let's us put all our routes in one seperate file and adds /api infront of i t




app.listen(process.env.PORT || 5000, () => console.log(`Port listening on 5000`));