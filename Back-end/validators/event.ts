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
check('name')
    .optional()
    .isString().withMessage('invalid_name'),

  check('description')
    .optional()
    .isString().withMessage('invalid_description'),

  check('category')
    .optional()
    .isIn(["tech", "design", "business", "education", "workshop", "health"])
    .withMessage('invalid_category'),

  check('date')
    .optional()
    .isISO8601().withMessage('invalid_date'),

  check('venue')
    .optional()
    .isString().withMessage('invalid_venue'),

  check('price')
    .optional()
    .isNumeric().withMessage('invalid_price'),

  check('image')
    .optional()
    .isString().withMessage('invalid_image'),
     validatorMiddleware
]
