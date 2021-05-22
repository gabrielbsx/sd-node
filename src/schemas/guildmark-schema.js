const Joi = require('joi');

module.exports = Joi.object().keys({
    guildid: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Guild inválida!',
            'number.integer': 'Guild inválida!',
            'number.min': 'Guild inválida!',
            'number.required': 'Guild é obrigatória!',
        }),
});