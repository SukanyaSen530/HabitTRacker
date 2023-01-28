import express from "express";
import { getUserById, registerUser, loginUser } from "../controllers/users.js";
import protectedRoute from "../middlware/protectedRoute.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

//user needs to login to access the route
userRoutes.get("/:id", protectedRoute, getUserById);

export default userRoutes;
