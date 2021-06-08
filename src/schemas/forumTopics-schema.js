const Joi = require('joi');

module.exports = Joi.object().keys({
    title: Joi.string()
        .max(100)
        .required()
        .messages({
            'string.base': 'Título inválido!',
            'string.empty': 'Título do pacote não pode ser vázio!',
            'string.max': 'Título do pacote muito grande!',
            'string.required': 'Título do pacote obrigatório!',
        }),

    slug: Joi.string()
        .min(3)
        .max(100)
        .pattern(new RegExp(/^[a-z0-9](-?[a-z0-9])*$/))
        .messages({
            'string.pattern': 'Slug inválido!',
            'string.min': 'Slug deve conter no mínimo 3 caracteres!',
            'string.max': 'Slug deve conter no máximo 100 caracteres!',
            'string.empty': 'Slug não deve estar vázio!',
            'string.required': 'Slug obrigatório!',
        }),
});