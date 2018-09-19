import { celebrate, Joi } from 'celebrate';

//Con celebrate valido los modelos ensegudia
export const UserRegistrar = celebrate({
    body: Joi.object().keys({
        Nombre: Joi.string().required(),
        Email: Joi.string().required(),
        Contraseña: Joi.string().required(),
        Foto: Joi.string().required()
    })
})