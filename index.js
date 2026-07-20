//dependencias
const express = require("express");
require("dotenv").config();
const helmet = require("helmet");

//funciones
const connectDB = require("./src/config/database");
const tokenVerification = require("./src/middlewares/appToken");
const usuariosRoutes = require("./src/routes/usuariosRoutes");

//variables
const PORT = process.env.PORT || 5100;
const app = express();

//index.js
app.use(express.json());
app.use(helmet());

connectDB();

app.use(tokenVerification);

app.listen(PORT, () =>
{
    console.log(`Hello Wrld. We are running on port ${PORT}`);
});

app.use("/users", usuariosRoutes);