import { Document } from "mongoose";
type Role = 'user' | 'admin'
export interface Users extends Document {
  email: string;
  password: string;
  name: string;
  image: string;
  role: Role;
}