import { body } from "express-validator";


export const product_validation=[
    body('name')
    .notEmpty()
    .escape()
    .withMessage('Name of product is required')
    .isLength({min:3})
    .withMessage('Name must be contain 3 character'),
    body('price')
    .notEmpty()
    .withMessage('Please enter price'),
    body('decription')
    .notEmpty()
    .withMessage('Please enter description')
    .escape()
    .isString()
    .withMessage('Description must be character')
]


