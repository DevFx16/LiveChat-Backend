import * as admin from 'firebase-admin';

var Admin = require('../Credencial/Credencial');

//Inicializo mi app de firebase
admin.initializeApp({ credential: admin.credential.cert(Admin) });

export default admin;


