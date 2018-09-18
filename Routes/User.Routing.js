import { Registrar } from '../Controllers/Usuario.Controller';

export default (app) => {
    app.get('/Registrar', Registrar);
}