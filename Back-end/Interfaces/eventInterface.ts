import { Document } from "mongoose";

export interface Event extends Document {
  name: string;
  description: string;
  category: string;
  venue: string;
  date:Date;
  price: number;
  image:string;
}