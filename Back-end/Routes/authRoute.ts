import { Router } from "express";
import { signup, login } from "../controllers/authController";
import { loginValidator, signupValidator } from "../validators/auth";
import validatorMiddleware from "../middlwares/validatorMiddleware";

const authRoute: Router = Router();
authRoute.route('/signup').post(signupValidator, validatorMiddleware,signup);
authRoute.route('/login').post(loginValidator,validatorMiddleware, login);
export default authRoute;