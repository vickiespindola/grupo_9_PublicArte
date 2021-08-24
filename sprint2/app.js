const express = require('express');
const app = express();
const port =3030;
const path =require('path');
const user = require('./routes/user');
const main = require('./routes/main');

app.use(express.static('public'))

app.use('/',user)
app.use('/',main)

app.listen(3030,() => console.log('servidor corriendo en el puerto '+port));