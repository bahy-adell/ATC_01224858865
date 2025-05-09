import { Application, Request, Response, NextFunction } from "express";
import customErrors from "../middlware/Errors";
import authRoute from "./authRoute";
const AllRoutes = (app: Application): void => {
    app.use('/api/auth', authRoute);
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new customErrors(`The router ${req.originalUrl} is not found`, 400));
    })
  }
  
  export default AllRoutes;
