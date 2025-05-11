import { Request,Response,NextFunction } from "express";
import asyncHandler from "express-async-handler";
import bookingModel from "../Models/bookingModel";
import eventModel from "../Models/eventModel";
import { Users } from "../Interfaces/userInterface";
import {utils} from "../middlwares/features";
// interface newRequest extends Request { user?: Users; }

export const bookEvent = asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user?._id;
    const eventId = req.params.id;

    const event = await eventModel.findById(eventId);
    if(!event)
    {
        res.status(404).json({message : "Event No longer Exist"})
    }

    const exictingBook = await bookingModel.findOne({userId:userId ,eventId: eventId})
    if(exictingBook)
    {
        res.status(400).json({message : "You have a ticket already "})
        return;
    }

    const newBook = await bookingModel.create(
    {
        userId : userId,
        eventId : eventId,
        refCode:  new utils().generateReferenceCode() ,
        createdAt: Date.now()
    }
);

 res.status(201).json({
        message : "Congrats. Enjoy Your Event" ,
        data: newBook
    })

});


export const getUserTickets = asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user?._id;
    
    const tickets = await bookingModel.find({userId:userId});

  if (tickets.length==0)  {
    res.status(404).json({ message: "You have no ticket" });
    return;
  }
  res.status(200).json({ message:"Ticket found" ,data: tickets });
});

export const getEventTickets = asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<void> => {
    // const userId = req.user?._id;
    const eventId = req.params.id;
    const tickets = await bookingModel.find({eventId:eventId});

  if (tickets.length==0) {
    res.status(404).json({ message: "No tickets yet for this Event" });
    return;
  }
  res.status(200).json({ message:"Tickets found" ,data: tickets });
});