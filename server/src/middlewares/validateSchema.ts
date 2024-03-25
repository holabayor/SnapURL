import Joi from 'joi';

export const shortenUrlSchema = Joi.object({
  originalUrl: Joi.string()
    .regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)
    .messages({
      'string.pattern.base': 'Invalid URL format.',
    }),
});

export const urlIdSchema = Joi.object({
  urlId: Joi.string().alphanum().required(),
});

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1),
});

// USER SCHEMAS

export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const userIdSchema = Joi.object({
  urlId: Joi.string().uuid().required(),
});
export const userSchema = Joi.object({
  firstName: Joi.string().min(2),
  lastName: Joi.string().min(2),
  email: Joi.string().email().required(),
  profilePicture: Joi.string(),
});
