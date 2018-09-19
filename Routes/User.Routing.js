import { Registrar, Login, VerficarToken } from '../Controllers/Usuario.Controller';
import { UserRegistrar, UserLogin, UserToken } from '../Models/Val.model';

export default (app) => {
    app.post('/Registrar', UserRegistrar, Registrar);
    app.post('/Login', UserLogin, Login);
    app.get('/Auth', UserToken, VerficarToken);
}