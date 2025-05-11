import { Schema, model } from "mongoose";
import { Event } from "../Interfaces/eventInterface"; 

const eventSchema :Schema =new Schema <Event>(
    {
       name:{type :String , required:true},
       description:{type :String , required :true},
       category: {type :String ,enum:["tech","design","business","education","workshop","health"] , required:true},
       date:{type :Date , required:true},
       venue:{type :String , required:true},
       price:{type :Number , required:true},
       image: {type :String , required:true}
    },
    {
        timestamps:true
    }
);
export default model<Event>('events', eventSchema)