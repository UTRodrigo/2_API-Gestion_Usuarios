//dependencias
const express = require("express");
require("dotenv").config();

//funciones
const connectDB = require("./src/config/database");
const usuariosRoutes = require("./src/routes/usuariosRoutes");

//variables
const PORT = process.env.PORT || 5100;
const app = express();

//index.js
connectDB();
app.use(express.json());
app.listen(PORT, () =>
{
    console.log(`Hello Wrld. We are running on port ${PORT}`);
});
app.use("/users", usuariosRoutes);