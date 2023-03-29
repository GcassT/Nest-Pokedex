import * as Joi from "joi";

export const JoiValidationSchema = Joi.object({ //Joi es un validador de esquemas de objetos de javascript que nos permite validar los datos que se envian a la API
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3000),
    DEFAULT_LIMIT: Joi.number().default(7),
})