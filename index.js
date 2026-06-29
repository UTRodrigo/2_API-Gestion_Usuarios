//dependencias
const express = require("express");
require("dotenv").config();

//funciones
const connectDB = require("./src/config/database");

//variables
const PORT = process.env.PORT || 5100;
const app = express();

//index.js
connectDB();
app.listen(PORT, () =>
{
    console.log(`Hello Wrld. We are running on port ${PORT}`);
});