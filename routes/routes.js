const express = require("express");
const { resolve } = require("path");

const authController = require("../src/controllers/authController");
const userController = require("../src/controllers/userController");
const courseController = require("../src/controllers/courseController");
const lessonController = require("../src/controllers/lessonController");
const subscriptionController = require("../src/controllers/subscriptionController");
const fileController = require("../src/controllers/fileController");
const streamController = require("../src/controllers/streamController");

const authMiddleware = require("../src/middlewares/authMiddleware");
const uploadMiddleware = require("../src/middlewares/uploadMiddleware");
const tokenMiddleware = require("../src/middlewares/tokenMiddleware");

const routes = express.Router();

// Root route
routes.get("/", (req, res) => res.send({ messege: "Você acessou o app Meraki!" }));

// Auth routes
routes.post("/registration", authController.registration);
routes.post("/authenticate", authController.authenticate);
routes.post("/forgot_password", authController.forgotPassword);
routes.post("/check_token", authController.checkToken);
routes.post("/reset_password", authController.resetPassword);

// Allow public access to assests folder
routes.use("/static", express.static(resolve(__dirname, "..", "assets")));

// Stream routes
routes.get("/stream/:id/:authorization", tokenMiddleware, authMiddleware, streamController.stream);

// Use the auth middleware to above routes
routes.use(authMiddleware);

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

// File uploads routes
routes.post("/files", uploadMiddleware, fileController.store);

module.exports = routes;
