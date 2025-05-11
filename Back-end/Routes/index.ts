import { Application, Request, Response, NextFunction } from "express";
import customErrors from "../middlwares/Errors";
import authRoute from "./authRoute";
import eventRoute from "./eventRoute";
import bookingRoute from "./bookingRoute";

const AllRoutes = (app: Application): void => {
    app.use('/api/auth', authRoute);
    app.use('/api/events', eventRoute);
    app.use('/api/booking', bookingRoute);


    app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new customErrors(`The router ${req.originalUrl} is not found`, 400));
    })
  }
  
  export default AllRoutes;
