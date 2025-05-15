import { Router } from "express";
import { allowedTo, protectRoute } from "../controllers/authController";
import { bookEvent, deleteTicket, getEventTickets, getUserTickets } from "../controllers/bookingController";
import validatorMiddleware from "../middlwares/validatorMiddleware";
const bookingRoute: Router = Router();
bookingRoute.route('/:id')
.post( protectRoute,allowedTo("admin","user"),validatorMiddleware,bookEvent)
.get(protectRoute,allowedTo("admin"),validatorMiddleware,getEventTickets)
.delete(protectRoute,allowedTo("admin","user"),validatorMiddleware,deleteTicket)
bookingRoute.route('/').get(protectRoute,allowedTo("admin","user"),validatorMiddleware,getUserTickets)

export default bookingRoute;