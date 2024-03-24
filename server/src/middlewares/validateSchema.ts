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
