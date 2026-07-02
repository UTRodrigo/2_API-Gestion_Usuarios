const Usuario = require("../models/usuarios");
const bcrypt = require("bcryptjs");

exports.registrarUsuario = async(req, res) => {
    try
    {
        const {name, email, password} = req.body;

        //Primero verificamos si el usuario ya fue registrado
        let usuario = await Usuario.findOne({email});
        if(usuario)
        {
            return res.status(400).json({msg: "The user is already registered"});
        }

        //Si no existe el usuario lo registramos
        usuario = new Usuario({name, email, password});

        //Encriptar la contraseña
        const salt = await bcrypt.genSalt(12);
        usuario.password = await bcrypt.hash(password, salt);

        //Guardar usuario en DB
        await usuario.save();
        res.status(201).json({msg: "User registered"});
    }
    catch(error)
    {
        res.status(500).json({error: "Error while trying to register user", errorMSG: error});
    }
}

exports.getUsuario = async(req, res) => {
    try
    {
        const {id} = req.params;
        const usuario = await Usuario.findById(id);
        if(!usuario)
        {
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json(usuario);
    }
    catch(error)
    {
        res.status(500).json({error: "Error while trying to get user", errorMSG: error});
    }
}

exports.getAllUsuarios = async(req, res) => {
    try
    {
        const usuarios = await Usuario.find();
        if(usuarios.length === 0)
        {
            return res.status(404).json({msg: "No users found"});
        }
        res.status(200).json(usuarios);
    }
    catch(error)
    {
        res.status(500).json({error: "Error recovering users", errorMSG: error});
    }
}

exports.updateUsuario = async(req, res) => {
    try
    {
        const {id} = req.params;
        const {name, email, password} = req.body;

        let usuario = await Usuario.findById(id);
        if(!usuario)
        {
            return res.status(404).json({msg: "User not found for update"});
        }

        //Encriptar la contraseña si se proporciona
        if(password)
        {
            const salt = await bcrypt.genSalt(12);
            usuario.password = await bcrypt.hash(password, salt);
        }

        if(name)
        {
            usuario.name = name;
        }
        if(email && email != undefined)
        {
            usuario.email = email;
        }

        await usuario.save();
        res.status(200).json({msg: "User updated"});
    }
    catch(error)
    {
        res.status(500).json({error: "Error updating a user", errorMSG: error});
    }
}

exports.deleteUsuario = async(req, res) => {
    try
    {
        const {id} = req.params;
        const usuario = await Usuario.findById(id);
        if(!usuario)
        {
            return res.status(404).json({msg: "User not found for delete"});
        }

        await usuario.deleteOne();
        res.status(200).json({msg: "User deleted"});
    }
    catch(error)
    {
        res.status(500).json({error: "Error deleting a user", errorMSG: error});
    }
}