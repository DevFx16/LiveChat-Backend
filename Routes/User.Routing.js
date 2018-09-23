import { Registrar, Login, VerficarToken, PasswordReset, Listar, CambiarNombre } from '../Controllers/Usuario.Controller';
import { UserRegistrar, UserLogin, UserToken, Email, ListUser, UserName } from '../Models/Val.model';

export default (app) => {
    app.post('/Registrar', UserRegistrar, Registrar);
    app.post('/Login', UserLogin, Login);
    app.put('/Reset', Email, PasswordReset);
    app.put('/Nombre', UserName, CambiarNombre);
    app.get('/Auth', UserToken, VerficarToken);
    app.get('/Listar', ListUser, Listar);
}