const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

// npm i joi sanitize-html

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if(clean !== value) return helpers.error('string.escapeHTML', {value})
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);
module.exports.flashcardSchema = Joi.object({
    name: Joi.string().required().escapeHTML(),
    background: Joi.string().optional().escapeHTML(),
    description: Joi.string().optional().escapeHTML(),
    visibility: Joi.boolean().optional(),
    cards: Joi.array().items(
        Joi.object({
            term: Joi.string().required().escapeHTML(),
            definition: Joi.string().required().escapeHTML()
        })
    ).min(3).required()
});