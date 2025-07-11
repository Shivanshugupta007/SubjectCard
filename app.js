const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const connectDB = require('./connection/db-connection')
const dotenv = require('dotenv');
const appRoutes = require('./routes/main-route');
const app = express();

const PORT=process.env.PORT;

dotenv.config();
app.use(express.json());

connectDB();

app.use('/', appRoutes);

app.listen(PORT, () => {
  console.log(`App Running At PORT ${PORT}`);
});
