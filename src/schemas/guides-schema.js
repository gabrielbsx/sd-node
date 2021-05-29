const Joi = require('joi');

module.exports = Joi.object().keys({
    title: Joi.string()
        .min(3)
        .max(100)
        .alter({
            createguide: (schema) => schema.required(),
            updateguide: (schema) => schema.required(),
        })
        .messages({
            'string.base': 'Título deve conter apenas caracteres alfa numéricos!',
            'string.empty': 'Título não deve estar vázio!',
            'string.max': 'Título muito grande!',
            'string.required': 'Título obrigatório!',
        }),

    slug: Joi.string()
        .min(3)
        .max(100)
        .pattern(new RegExp(/^[a-z0-9](-?[a-z0-9])*$/))
        .alter({
            createguide: (schema) => schema.required(),
            updateguide: (schema) => schema.required(),
        })
        .messages({
            'string.pattern': 'Slug inválido!',
            'string.min': 'Slug deve conter no mínimo 3 caracteres!',
            'string.max': 'Slug deve conter no máximo 100 caracteres!',
            'string.empty': 'Slug não deve estar vázio!',
            'string.required': 'Slug obrigatório!',
        }),

    content: Joi.string()
        .alter({
            createguide: (schema) => schema.required(),
            updateguide: (schema) => schema.required(),
        })
        .messages({
            'string.empty': 'Conteúdo não deve estar vázio!',
            'string.required': 'Conteúdo obrigatório!',
        }),   
});