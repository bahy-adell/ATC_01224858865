import { Router } from "express";
import { createEvent, deleteEvent, getAllEvents, getEvent, resizeImage, updateEvent, uploadImage } from "../controllers/eventController";
import { allowedTo, protectRoute } from "../controllers/authController";
import { createEventValidator, updateEventValidator } from "../validators/event";
const eventRoute: Router = Router();
eventRoute.route('/')
.post( protectRoute,allowedTo("admin"),uploadImage,resizeImage,createEventValidator,createEvent)
.get(protectRoute,allowedTo("admin","user"),getAllEvents)
eventRoute.route('/:id')
.get(protectRoute,allowedTo("admin","user"),getEvent)
.put(protectRoute,allowedTo("admin"),uploadImage,resizeImage,updateEventValidator,updateEvent)
.delete(protectRoute,allowedTo("admin"),deleteEvent)
export default eventRoute;