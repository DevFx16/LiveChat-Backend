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

export const Email = celebrate({
    body: Joi.object().keys({
        Email: Joi.string().required(),
    })
});

export const UserToken = celebrate({
    headers: Joi.object().keys({
        token: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }).unknown()
}, { escapeHtml: false });

export const Token = celebrate({
    headers: Joi.object().keys({
        token: Joi.string().required()
    }).unknown()
}, { escapeHtml: false });

export const ListUser = celebrate({
    headers: Joi.object().keys({
        token: Joi.string().required(),
        page: Joi.string()
    }).unknown()
}, { escapeHtml: false });

export const UserName = celebrate({
    headers: Joi.object().keys({
        token: Joi.string().required(),
        id: Joi.string().required()
    }).unknown(),
    body: Joi.object().keys({
        Nombre: Joi.string().required()
    })
}, { escapeHtml: false });