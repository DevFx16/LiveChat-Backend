//Importamos las librerias del proyecto
import Firebase, { Auth } from './Firebase';

//Funcion para registrar usuarios
export function Registrar(req, res) {
    //Creo usuario
    Firebase.auth().createUser({
        displayName: req.body.Nombre,
        email: req.body.Email,
        password: req.body.Password,
        photoURL: req.body.Foto
    }).then(user => {
        res.status(200).send({ Mensaje: 'Ok' });
    }).catch(err => {
        //Error
        res.status(406).send({ Error: err.message });
    })
}

//Funcion Login 
export function Login(req, res) {
    //Probando Login
    Auth.auth().signInWithEmailAndPassword(req.body.Email, req.body.Password).then(user => {
        //Obteniendo Token
        user.user.getIdToken(true).then(token => {
            //Retorno respuesta
            return res.status(200).send({
                Token: token,
                Nombre: user.user.displayName,
                Foto: user.user.photoURL,
                Id: user.user.uid
            });
        }).catch(err => {
            //envio una respuesta
            res.status(200).send({ Mensaje: 'Ok' });
        })
    }).catch(err => {
        //Error
        res.status(406).send({ Error: err.message });
    })
}

//Verificar Token
export function VerficarToken(req, res) {
    //VERIFICO TOKEN
    VerficarTokenId(req.headers.token).then(user => {
        //SI NO HAY ERROR SIGUE LOGUEADO
        res.status(200).send({Mensaje: 'Ok'});
    }).catch(err => {
        //Error
        if (err.message.includes('Firebase ID token has expired')) {
            Auth.auth().signInWithEmailAndPassword(req.headers.email, req.headers.password).then(user => {
                user.user.getIdToken().then(token => {
                    res.status(202).send(token);
                }).catch(err => {
                    res.status(401).send({ Error: 'Acceso no autorizado' });
                })
            });
        } else {
            res.status(401).send({ Error: 'Acceso no autorizado' });
        }
    })
}

//PasswordRest
export function PasswordReset(req, res) {
    Auth.auth().sendPasswordResetEmail(req.body.Email).then(user => {
        res.status(200).send({ Mensaje: 'Ok' });
    }).catch(err => {
        //Error
        res.status(406).send({ Error: err.message });
    })
}

//FUNCION PARA VERIFICAR
function VerficarTokenId(Token) {
    return Firebase.auth().verifyIdToken(Token);
}