import { Schema, model } from "mongoose";
import { Users } from "../Interfaces/userInterface";
import bcrypt from 'bcryptjs';
const usersSchema: Schema = new Schema<Users>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6, maxlength: 20 },
  image: String,
  role: { type: String, required: true, enum: [ 'admin', 'user'], default: 'user' },

}, { timestamps: true });


usersSchema.pre<Users>('save', async function (next) {
  if (!this.isModified('password')) return next;
  this.password = await bcrypt.hash(this.password, 10)
});

export default model<Users>('users', usersSchema)