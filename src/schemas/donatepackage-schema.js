const Joi = require('joi');

module.exports = Joi.object().keys({
    name: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.base': 'Nome inválido!',
            'string.empty': 'Nome do pacote não pode ser vázio!',
            'string.max': 'Nome do pacote muito grande!',
            'string.required': 'Nome do pacote obrigatório!',
        }),

    percent: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': 'Porcentagem inválida!',
            'number.integer': 'Porcentagem inválida!',
            'number.min': 'Porcentagem inválida!',
            'number.required': 'Porcentagem é obrigatória!',
        }),

    value: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': 'Valor do pacote deve conter apenas números!',
            'number.min': 'Valor do pacote inválido!',
            'number.required': 'Valor do pacote é obrigatório!',
        }),
    
    donate: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': 'Valor de doação do pacote deve conter apenas números inteiros!',
            'number.integer': 'Valor de doação do pacote deve ser apenas números inteiros!',
            'number.min': 'Valor de doação do pacote deve ser maior ou igual a 0!',
            'number.required': 'Valor de doação do pacote é obrigatório!',
        }),
});