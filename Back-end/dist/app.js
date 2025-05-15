"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./DB_config/database"));
const Routes_1 = __importDefault(require("./Routes"));
const cors_1 = __importDefault(require("cors"));
const globalError_1 = require("./middlwares/globalError");
const i18n_1 = __importDefault(require("./middlwares/i18n"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.options('*', (0, cors_1.default)());
(0, database_1.default)();
dotenv_1.default.config();
app.use("/uploads", express_1.default.static("uploads"));
app.use(i18n_1.default);
(0, Routes_1.default)(app);
app.use(globalError_1.errorMiddleware);
app.listen(process.env.PORT || 3010, () => {
    console.log(`App listen on Port : ${process.env.PORT}`);
});
