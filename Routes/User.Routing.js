import { Registrar } from '../Controllers/Usuario.Controller';
import { UserRegistrar } from '../Models/Val.model';

export default (app) => {
    app.post('/Registrar', UserRegistrar, Registrar);
}