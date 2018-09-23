import { Registrar, Login, VerficarToken, PasswordReset, Listar } from '../Controllers/Usuario.Controller';
import { UserRegistrar, UserLogin, UserToken, Email, ListUser } from '../Models/Val.model';

export default (app) => {
    app.post('/Registrar', UserRegistrar, Registrar);
    app.post('/Login', UserLogin, Login);
    app.put('/Reset', Email, PasswordReset);
    app.get('/Auth', UserToken, VerficarToken);
    app.get('/Listar', ListUser, Listar);
}