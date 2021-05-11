import Joi from 'joi';

const charName = Joi.string().alphanum().min(3).max(20).messages({
  'string.min': 'Names should be 3 or above characters.',
  'string.max': 'Names can be up to 20 characters',
  'string.alphanum': 'Names should only have alphanumeric characters.'
});

const icon = Joi.number();
const petType = Joi.string().min(1).max(1).required();

export const charSchema = Joi.object({
  icon,
  name: charName.required(),
  traits: Joi.string(),
  desc: Joi.string(),
  other: Joi.string(),
  petName: charName.required(),
  pet: petType
});
