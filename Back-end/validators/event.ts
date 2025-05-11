import { RequestHandler } from "express";
import { check } from "express-validator";
import usersModel from "../Models/userModel";
import validatorMiddleware from "../middlwares/validatorMiddleware";

export const createEventValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage('name is required'),
  check('description')
    .notEmpty().withMessage('description is required'),
  check('category')
    .notEmpty().withMessage('category is required'),
  check('date')
    .notEmpty().withMessage('date is required'),
  check('venue')
    .notEmpty().withMessage('venue is required'),
  check('price')
    .notEmpty().withMessage('price is required').isNumeric().withMessage('Invalid price'),
  check('image')
    .notEmpty().withMessage('image is required'),
  
  validatorMiddleware
]

export const updateEventValidator: RequestHandler[] = [
  
  check('price')
  .isNumeric().withMessage('Invalid price'),
  validatorMiddleware
]
