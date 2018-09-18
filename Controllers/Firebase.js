import * as admin from 'firebase-admin';

var Admin = require('../Credencial/Credencial');

admin.initializeApp({ credential: admin.credential.cert(Admin) });

export default admin;


