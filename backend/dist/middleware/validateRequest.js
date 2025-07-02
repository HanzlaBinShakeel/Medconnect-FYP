"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const validateRequest = (dtoClass) => {
    return async (req, res, next) => {
        const dto = (0, class_transformer_1.plainToClass)(dtoClass, req.body);
        const errors = await (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            const validationErrors = errors.map((error) => {
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
exports.validateRequest = validateRequest;
