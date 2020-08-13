const express = require("express");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const courseController = require("./controllers/courseController");
const lessonController = require("./controllers/lessonController");
const subscriptionController = require("./controllers/subscriptionController");

const routes = express.Router();

// Auth routes
routes.post("/auth", authController.logIn);

// User routes
routes.get("/users", userController.index);
routes.post("/users", userController.store);
routes.get("/users/:id", userController.show);
routes.put("/users/:id", userController.update);
routes.delete("/users/:id", userController.destroy);

// Course routes
routes.get("/courses", courseController.index);
routes.post("/courses", courseController.store);
routes.get("/courses/:id", courseController.show);
routes.put("/courses/:id", courseController.update);
routes.delete("/courses/:id", courseController.destroy);

// Lesson routes
routes.get("/lessons", lessonController.index);
routes.post("/lessons", lessonController.store);
routes.get("/lessons/:id", lessonController.show);
routes.put("/lessons/:id", lessonController.update);
routes.delete("/lessons/:id", lessonController.destroy);

// Subscription routes
routes.get("/subscriptions", subscriptionController.index);
routes.post("/subscriptions", subscriptionController.store);
routes.get("/subscriptions/:id", subscriptionController.show);
routes.put("/subscriptions/:id", subscriptionController.update);
routes.delete("/subscriptions/:id", subscriptionController.destroy);

module.exports = routes;
