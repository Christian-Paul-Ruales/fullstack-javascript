import * as Joi from 'joi';
// validamos las variables de entorno

export const JoiValidationSchema = Joi.object(
  {
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DAFAULT_LIMIT: Joi.number().default(6),
  }
);