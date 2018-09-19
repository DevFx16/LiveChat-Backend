import * as admin from 'firebase-admin';
import * as firebase from 'firebase';

var Admin = require('../Credencial/Credencial');

//Inicializo mi app de firebase
admin.initializeApp({ credential: admin.credential.cert(Admin) });

firebase.initializeApp({
    apiKey: "AIzaSyBxlTgDg99WfICIkX4TqiccNTqfndCnjoY",
    authDomain: "livechat-6e105.firebaseapp.com",
});

export const Auth = firebase;
export default admin;

