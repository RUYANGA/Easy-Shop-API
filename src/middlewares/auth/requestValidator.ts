import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (req: Request,res: Response,next: NextFunction
): void => {

  const errors = validationResult(req);
  if (!errors.isEmpty()){
    
    const errorFormat = errors.array().map(err => ({
      message: err.msg,
    }));

    res.status(400).json({ errors: errorFormat });
    return; // <-- IMPORTANT to avoid falling through
  }

  next();

};
