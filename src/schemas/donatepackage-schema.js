const Joi = require('joi');

module.exports = Joi.object().keys({
    name: Joi.string()
        .max(255)
        .required()
        .alter({
            createpackage: (schema) => schema.required(),
            updatepackage: (schema) => schema.required(),
        })
        .messages({
            'string.base': 'Nome inválido!',
            'string.empty': 'Nome do pacote não pode ser vázio!',
            'string.max': 'Nome do pacote muito grande!',
            'string.required': 'Nome do pacote obrigatório!',
        }),

    slug: Joi.string()
        .min(3)
        .max(100)
        .pattern(new RegExp(/^[a-z0-9](-?[a-z0-9])*$/))
        .alter({
            createpackage: (schema) => schema.required(),
            updatepackage: (schema) => schema.required(),
        })
        .messages({
            'string.pattern': 'Slug inválido!',
            'string.min': 'Slug deve conter no mínimo 3 caracteres!',
            'string.max': 'Slug deve conter no máximo 100 caracteres!',
            'string.empty': 'Slug não deve estar vázio!',
            'string.required': 'Slug obrigatório!',
        }),

    percent: Joi.number()
        .integer()
        .min(0)
        .required()
        .alter({
            createpackage: (schema) => schema.required(),
            updatepackage: (schema) => schema.required(),
        })
        .messages({
            'number.base': 'Porcentagem inválida!',
            'number.integer': 'Porcentagem inválida!',
            'number.min': 'Porcentagem inválida!',
            'number.required': 'Porcentagem é obrigatória!',
        }),

    value: Joi.number()
        .min(0)
        .required()
        .alter({
            createpackage: (schema) => schema.required(),
            updatepackage: (schema) => schema.required(),
        })
        .messages({
            'number.base': 'Valor do pacote deve conter apenas números!',
            'number.min': 'Valor do pacote inválido!',
            'number.required': 'Valor do pacote é obrigatório!',
        }),
    
    donate: Joi.number()
        .integer()
        .min(0)
        .required()
        .alter({
            createpackage: (schema) => schema.required(),
            updatepackage: (schema) => schema.required(),
        })
        .messages({
            'number.base': 'Valor de doação do pacote deve conter apenas números inteiros!',
            'number.integer': 'Valor de doação do pacote deve ser apenas números inteiros!',
            'number.min': 'Valor de doação do pacote deve ser maior ou igual a 0!',
            'number.required': 'Valor de doação do pacote é obrigatório!',
        }),
});