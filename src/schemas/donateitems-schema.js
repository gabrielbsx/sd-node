const Joi = require('joi');

module.exports = Joi.object().keys({
    id_package: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.base': 'Nome inválido!',
            'string.empty': 'Nome do pacote não pode ser vázio!',
            'string.max': 'Nome do pacote muito grande!',
            'string.required': 'Nome do pacote obrigatório!',
        }),

    itemname: Joi.string()
        .required()
        .messages({
            'string.base': 'Nome do item deve conter apenas caracteres!',
            'string.required': 'Nome do item é obrigatória!',
        }),

    item_id: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'Index do item deve conter apenas números inteiros!',
            'number.empty': 'Index do item deve conter apenas números inteiros!',
            'number.integer': 'Index do item deve conter apenas números inteiros!',
            'number.required': 'Index do item é obrigatório!',
        }),

    eff1: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'Efeito 1 do item deve conter apenas números!',
            'number.empty': 'Efeito 1 do item deve conter apenas números inteiros!',
            'number.integer': 'Efeito 1 do item deve conter apenas números inteiros!',
            'number.required': 'Efeito 1 do item é obrigatório!',
        }),

    effv1: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'Valor de efeito 1 do item deve conter apenas números!',
            'number.empty': 'Valor de efeito 1 do item deve conter apenas números inteiros!',
            'number.integer': 'Valor de efeito 1 do item deve conter apenas números inteiros!',
            'number.required': 'Valor de efeito 1 do item é obrigatório!',
        }),

    eff2: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'Efeito 2 do item deve conter apenas números!',
            'number.empty': 'Efeito 2 do item deve conter apenas números inteiros!',
            'number.integer': 'Efeito 2 do item deve conter apenas números inteiros!',
            'number.required': 'Efeito 2 do item é obrigatório!',
        }),

    effv2: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'Valor de efeito 2 do item deve conter apenas números!',
            'number.empty': 'Valor de efeito 2 do item deve conter apenas números inteiros!',
            'number.integer': 'Valor de efeito 2 do item deve conter apenas números inteiros!',
            'number.required': 'Valor de efeito 2 do item é obrigatório!',
        }),

    eff3: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'Efeito 3 do item deve conter apenas números!',
            'number.empty': 'Efeito 3 do item deve conter apenas números inteiros!',
            'number.integer': 'Efeito 3 do item deve conter apenas números inteiros!',
            'number.required': 'Efeito 3 do item é obrigatório!',
        }),

    effv3: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'Valor de efeito 3 do item deve conter apenas números!',
            'number.empty': 'Valor de efeito 3 do item deve conter apenas números inteiros!',
            'number.integer': 'Valor de efeito 3 do item deve conter apenas números inteiros!',
            'number.required': 'Valor de efeito 3 do item é obrigatório!',
        }),
});