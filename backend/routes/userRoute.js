import express from "express";
import {
  loginUser,
  registerUser,
  getUserDetails,
  logOut,
} from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", authenticateUser, getUserDetails);
userRouter.get("/logout", logOut);

export default userRouter;
