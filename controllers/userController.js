const { request, response } = require("express");
const userModel = require("../models/userModel");

//Función que permite exportar métodos o clases
exports.getAllUsers = (request, response) => {
    userModel.find()
        .then(users => response.json(users))
        .catch(err => response.status(500).json({ error: err.message }))
}

exports.createUser = (request, response) => {
    const { username, email, password } = request.body;
    const newUser = new userModel(
        { username, email, password }
    );

    newUser.save()
        .then(newUser => response.status(201).json(newUser))
        .catch(err => response.status(500).json({ error: err.message }))
}