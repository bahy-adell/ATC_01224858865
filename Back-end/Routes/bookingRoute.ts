import { Router } from "express";
import { allowedTo, protectRoute } from "../controllers/authController";
import { bookEvent, getUserTickets } from "../controllers/bookingController";
import validatorMiddleware from "../middlware/validatorMiddleware";
const bookingRoute: Router = Router();
bookingRoute.route('/:id')
.post( protectRoute,allowedTo("admin","user"),validatorMiddleware,bookEvent)
bookingRoute.route('/').get(protectRoute,allowedTo("admin","user"),validatorMiddleware,getUserTickets)

export default bookingRoute;