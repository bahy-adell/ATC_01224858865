import { Schema, model } from "mongoose";
import { Booking } from "../Interfaces/bookingInterface"; 


const bookingSchema :Schema =new Schema <Booking>(
    {
       userId:{type :Schema.Types.ObjectId ,ref :"users", required:true},
       eventId:{type :Schema.Types.ObjectId  ,ref :"events",required :true},
       refCode:{type:String ,required :true},
       eventName:{type:String ,required :true},
       price:{type:Number ,required :true},
       numOfTickets:{type:Number , default:1},
       eventDate:{type :Date , required:true},
       createdAt:{type :Date , required:true},
    },
    {
        timestamps:true
    }
);
export default model<Booking>('booking', bookingSchema)