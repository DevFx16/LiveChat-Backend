import { Registrar, Login, VerficarToken, PasswordReset, Listar, CambiarNombre, SubirFoto, Logout, BorrarCuenta } from '../Controllers/Usuario.Controller';
import { UserRegistrar, UserLogin, UserToken, Email, ListUser, UserName, Archivo, Token } from '../Models/Val.model';

export default (app) => {
    app.post('/Registrar', UserRegistrar, Registrar);
    app.post('/Login', UserLogin, Login);
    app.post('/Foto', Archivo, SubirFoto);
    app.put('/Reset', Email, PasswordReset);
    app.put('/Nombre', UserName, CambiarNombre);
    app.get('/Auth', UserToken, VerficarToken);
    app.get('/Listar', ListUser, Listar);
    app.get('/Logout', Token, Logout);
    app.get('/Borrar', Token, BorrarCuenta);
}