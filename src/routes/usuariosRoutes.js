const express = require("express");
const router = express.Router();
const userController = require("../controllers/usuariosControllers");

router.post("/register", userController.registrarUsuario);
router.get("/id/:id", userController.getUsuario);
router.get("/all", userController.getAllUsuarios);
router.put("/update/:id", userController.updateUsuario);
router.delete("/delete/:id", userController.deleteUsuario);

module.exports = router;