import { RequestHandler } from "express";
import { check } from "express-validator";
import usersModel from "../Models/userModel";
import validatorMiddleware from "../middlwares/validatorMiddleware";

export const createEventValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage('name_required'),
  check('description')
    .notEmpty().withMessage('description_required'),
  check('category')
    .notEmpty().withMessage('category_required'),
  check('date')
    .notEmpty().withMessage('date_required'),
  check('venue')
    .notEmpty().withMessage('venue_required'),
  check('price')
    .notEmpty().withMessage('price_required').isNumeric().withMessage('invalid_price'),
  check('image')
    .notEmpty().withMessage('image_required'),
  
  validatorMiddleware
]

export const updateEventValidator: RequestHandler[] = [
  
  check('price')
  .isNumeric().withMessage('invalid_price'),
  validatorMiddleware
]
