const Joi = require('joi');

module.exports = Joi.object().keys({
    id_package: Joi.string()
        .max(36)
        .required()
        .alter({
            createitem: (schema) => schema.required(),
            updateitem: (schema) => schema.required(),
        })
        .messages({
            'string.base': 'Pacote inválido!',
            'string.max': 'Pacote inválido!',
            'string.required': 'Pacote obrigatório!',
        }),

    slug: Joi.string()
        .min(3)
        .max(100)
        .pattern(new RegExp(/^[a-z0-9](-?[a-z0-9])*$/))
        .alter({
            createitem: (schema) => schema.required(),
            updateitem: (schema) => schema.required(),
        })
        .messages({
            'string.pattern': 'Slug inválido!',
            'string.min': 'Slug deve conter no mínimo 3 caracteres!',
            'string.max': 'Slug deve conter no máximo 100 caracteres!',
            'string.empty': 'Slug não deve estar vázio!',
            'string.required': 'Slug obrigatório!',
        }),

    itemname: Joi.string()
        .required()
        .alter({
            createitem: (schema) => schema.required(),
            updateitem: (schema) => schema.required(),
        })
        .messages({
            'string.base': 'Nome do item deve conter apenas caracteres!',
            'string.required': 'Nome do item é obrigatória!',
        }),

    item_id: Joi.number()
        .integer()
        .required()
        .alter({
            createitem: (schema) => schema.required(),
            updateitem: (schema) => schema.required(),
        })
        .messages({
            'number.base': 'Index do item deve conter apenas números inteiros!',
            'number.empty': 'Index do item deve conter apenas números inteiros!',
            'number.integer': 'Index do item deve conter apenas números inteiros!',
            'number.required': 'Index do item é obrigatório!',
        }),

    eff1: Joi.number()
        .integer()
        .required()
        .alter({
            createitem: (schema) => schema.required(),
            updateitem: (schema) => schema.required(),
        })
        .messages({
            'number.base': 'Efeito 1 do item deve conter apenas números!',
            'number.empty': 'Efeito 1 do item deve conter apenas números inteiros!',
            'number.integer': 'Efeito 1 do item deve conter apenas números inteiros!',
            'number.required': 'Efeito 1 do item é obrigatório!',
        }),

    effv1: Joi.number()
        .integer()
        .required()
        .alter({
            createitem: (schema) => schema.required(),
            updateitem: (schema) => schema.required(),
        })
        .messages({
            'number.base': 'Valor de efeito 1 do item deve conter apenas números!',
            'number.empty': 'Valor de efeito 1 do item deve conter apenas números inteiros!',
            'number.integer': 'Valor de efeito 1 do item deve conter apenas números inteiros!',
            'number.required': 'Valor de efeito 1 do item é obrigatório!',
        }),

    eff2: Joi.number()
        .integer()
        .required()
        .alter({
            createitem: (schema) => schema.required(),
            updateitem: (schema) => schema.required(),
        })
        .messages({
            'number.base': 'Efeito 2 do item deve conter apenas números!',
            'number.empty': 'Efeito 2 do item deve conter apenas números inteiros!',
            'number.integer': 'Efeito 2 do item deve conter apenas números inteiros!',
            'number.required': 'Efeito 2 do item é obrigatório!',
        }),

    effv2: Joi.number()
        .integer()
        .required()
        .alter({
            createitem: (schema) => schema.required(),
            updateitem: (schema) => schema.required(),
        })
        .messages({
            'number.base': 'Valor de efeito 2 do item deve conter apenas números!',
            'number.empty': 'Valor de efeito 2 do item deve conter apenas números inteiros!',
            'number.integer': 'Valor de efeito 2 do item deve conter apenas números inteiros!',
            'number.required': 'Valor de efeito 2 do item é obrigatório!',
        }),

    eff3: Joi.number()
        .integer()
        .required()
        .alter({
            createitem: (schema) => schema.required(),
            updateitem: (schema) => schema.required(),
        })
        .messages({
            'number.base': 'Efeito 3 do item deve conter apenas números!',
            'number.empty': 'Efeito 3 do item deve conter apenas números inteiros!',
            'number.integer': 'Efeito 3 do item deve conter apenas números inteiros!',
            'number.required': 'Efeito 3 do item é obrigatório!',
        }),

    effv3: Joi.number()
        .integer()
        .required()
        .alter({
            createitem: (schema) => schema.required(),
            updateitem: (schema) => schema.required(),
        })
        .messages({
            'number.base': 'Valor de efeito 3 do item deve conter apenas números!',
            'number.empty': 'Valor de efeito 3 do item deve conter apenas números inteiros!',
            'number.integer': 'Valor de efeito 3 do item deve conter apenas números inteiros!',
            'number.required': 'Valor de efeito 3 do item é obrigatório!',
        }),
});