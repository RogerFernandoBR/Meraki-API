const express = require('express');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const courseController = require('./controllers/courseController');

const routes = express.Router();

// Auth routes
routes.post('/auth', authController.show);

// User routes
routes.get('/users', userController.index);
routes.post('/users', userController.store);
routes.get('/users/:id', userController.show);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.destroy);

// Course routes
routes.get('/courses', courseController.index);
routes.post('/courses', courseController.store);
routes.get('/courses/:id', courseController.show);
routes.put('/courses/:id', courseController.update);
routes.delete('/courses/:id', courseController.destroy);

module.exports = routes;
