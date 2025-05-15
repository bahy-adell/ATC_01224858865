import mongoose, { Document } from "mongoose";

export interface Booking extends Document {
  userId: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
  refCode:string;
  eventName:string;
  price:number;
  numOfTickets?:number;
  createdAt:Date;

}