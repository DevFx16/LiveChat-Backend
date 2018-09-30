import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import Cred from '../Credencial/CredencialAuth';

var Admin = require('../Credencial/Credencial');

//Inicializo mi app de firebase
admin.initializeApp({ credential: admin.credential.cert(Admin) });

firebase.initializeApp(Cred);

export const Auth = firebase;
export const Archivos = admin.storage().bucket(Cred.storageBucket);
export default admin;

