"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database = () => {
    const uri = process.env.MONGODB_URI || process.env.DB;
    // const uri = process.env.DB;
    if (!uri) {
        throw new Error("MongoDB URI is missing in environment variables!");
    }
    mongoose_1.default.connect(uri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    })
        .then(() => {
        console.log(`Database connected successfully to: ${uri}`);
    })
        .catch((err) => {
        console.error("Database connection error:", err);
        // Retry connection after 5 seconds
        setTimeout(() => {
            console.log("Retrying database connection...");
            database();
        }, 5000);
    });
    // Handle connection events
    mongoose_1.default.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });
    mongoose_1.default.connection.on('disconnected', () => {
        console.log('MongoDB disconnected. Attempting to reconnect...');
        setTimeout(() => {
            database();
        }, 5000);
    });
    process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        }
        catch (err) {
            console.error('Error during MongoDB connection closure:', err);
            process.exit(1);
        }
    }));
};
exports.default = database;
