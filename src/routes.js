const express = require('express');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

const routes = express.Router();

// Auth routes
routes.post('/auth', authController.show);

// User routes
routes.get('/users', userController.index);
routes.post('/users', userController.store);
routes.post('/users/:id', userController.show);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.destroy);

// Course routes

module.exports = routes;
