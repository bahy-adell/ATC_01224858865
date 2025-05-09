import { Router } from "express";
import { signup, login } from "../controllers/authController";
import { loginValidator, signupValidator } from "../validators/auth";

const authRoute: Router = Router();
authRoute.route('/signup').post(signupValidator, signup);
authRoute.route('/login').post(loginValidator, login);
export default authRoute;