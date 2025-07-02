import { Request, Response, NextFunction } from 'express';
import { ValidationError, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const validateRequest = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToClass(dtoClass, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const validationErrors = errors.map((error: ValidationError) => {
        return {
          property: error.property,
          constraints: error.constraints,
        };
      });

      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    req.body = dto;
    next();
  };
}; 