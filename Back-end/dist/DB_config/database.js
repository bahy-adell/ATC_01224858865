"use strict";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config(); 
// const database = ()=>{
//     mongoose.connect(process.env.MONGODB_URI!).then(
//         ()=>{
//             console.log(`database connected to ${process.env.MONGODB_URI}`);
//         }).catch(  (err:Error)=>{
//             console.log(err);
//         });
// }
// export default database ;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database = () => {
    const uri = process.env.MONGODB_URI || process.env.DB;
    if (!uri) {
        throw new Error(" MongoDB URI is missing in environment variables!");
    }
    mongoose_1.default.connect(uri)
        .then(() => {
        console.log(`Database connected to: ${uri}`);
    })
        .catch((err) => {
        console.error("Database connection error:", err);
    });
};
exports.default = database;
