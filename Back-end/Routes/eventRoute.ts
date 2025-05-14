import { Router } from "express";
import { createEvent, deleteEvent, getAllEvents, getEvent, resizeImage, updateEvent, uploadImage } from "../controllers/eventController";
import { allowedTo, protectRoute } from "../controllers/authController";
import { createEventValidator, updateEventValidator } from "../validators/event";
import validatorMiddleware from "../middlwares/validatorMiddleware";
const eventRoute: Router = Router();
eventRoute.route('/')
.post( protectRoute,allowedTo("admin"),uploadImage,resizeImage,createEventValidator,validatorMiddleware,createEvent)
.get(validatorMiddleware,getAllEvents)
eventRoute.route('/:id')
.get(protectRoute,allowedTo("admin","user"),validatorMiddleware,getEvent)
.put(protectRoute,allowedTo("admin"),uploadImage,resizeImage,updateEventValidator,validatorMiddleware,updateEvent)
.delete(protectRoute,allowedTo("admin"),validatorMiddleware,deleteEvent)
export default eventRoute;