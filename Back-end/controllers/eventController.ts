import { Request,Response,NextFunction } from "express";
import eventModel from "../Models/eventModel";
import asyncHandler from "express-async-handler";
import sharp from "sharp";
import path from "path";
import customErrors from "../middlware/Errors";
import { uploadSingleImage } from "../middlware/uploadImages";


export const createEvent = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {

 const newEvent = await eventModel.create(req.body)
 res.status(201).json({success :true , event: newEvent})
});

export const uploadImage = uploadSingleImage("image");

export const resizeImage = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
 if(!req.file) return next();

 const imageName = `event-${Date.now()}.jpeg`;
 const imagePath = path.join("uploads","events",imageName);
 
 await sharp(req.file.buffer)
    .resize(600,600)
    .toFormat("jpeg")
    .jpeg({quality : 90})
    .toFile(imagePath)
 req.body.image = `/uploads/events/${imageName}`
 next();
});

export const updateEvent = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
 const event = await eventModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!event) {
    return next(new customErrors('Event not found', 404))
  }
  res.status(200).json({  message: "Updated successfully",data: event });
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
 const event = await eventModel.findByIdAndDelete(req.params.id);
  if (!event) {
    return next(new customErrors('Event not found', 404))
  }
  event.save();
  res.status(204).json({ message: "Deleted successfully" });
});

export const getEvent = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
 const event = await eventModel.findById(req.params.id);
  if (!event) {
    return next(new customErrors('Event not found', 404))
  }
  res.status(200).json({ data: event });
});

export const getAllEvents = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
 const event = await eventModel.find();
  if (!event) {
    return next(new customErrors('Event not found', 404))
  }
  res.status(200).json({ data: event });
});