import { celebrate, Joi } from 'celebrate';

//Con celebrate valido los modelos ensegudia
export const UserRegistrar = celebrate({
    body: Joi.object().keys({
        Nombre: Joi.string().required(),
        Email: Joi.string().required(),
        Password: Joi.string().required(),
        Foto: Joi.string().required()
    })
});

export const UserLogin = celebrate({
    body: Joi.object().keys({
        Email: Joi.string().required(),
        Password: Joi.string().required(),
    })
});

export const UserToken = celebrate({
    headers: Joi.object().keys({
        token: Joi.string().required(),
    }).unknown()
}, { escapeHtml: false });