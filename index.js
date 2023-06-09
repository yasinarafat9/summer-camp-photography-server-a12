const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('summer camp photography is running')
})

app.listen(port, ()=> {
    console.log(`summer camp photography is running on port: ${port}`);
})

