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
        .catch(err => response.status(500).json({ message: 'An error has ocurred', err }))
}


exports.updateUser = (request, response) => {
    const { userId } = request.params;
    const { username, email, password } = request.body;

    userModel.findByIdAndUpdate(userId, { username, email, password }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) throw new Error(`User with id ${userId} not found`);
            response.status(200).json(updatedUser);
        })
        .catch(err => response.status(500).json({ message: 'An error has ocurred', err }));
};

exports.deleteUser = (request, response) => {
    const { userId } = request.params;

    userModel.findByIdAndDelete(userId)
        .then(updatedUser => {
            if (!updatedUser) throw new Error(`User with id ${userId} not found`);
            response.status(200).json({ message: 'user deleted' });
        })
        .catch(err => response.status(500).json({ message: 'An error has ocurred', err }));
};