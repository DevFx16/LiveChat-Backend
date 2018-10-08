//Importamos las librerias del proyecto
import Firebase, { Auth, Archivos } from './Firebase';

//Funcion para registrar usuarios
export function Registrar(req, res) {
    //Creo usuario
    Firebase.auth().createUser({
        displayName: req.body.Nombre,
        email: req.body.Email,
        password: req.body.Password,
        photoURL: req.body.Foto
    }).then(user => {
        return res.status(200).send({ Mensaje: 'Ok' });
    }).catch(err => {
        //Error
        return res.status(406).send({ Error: err.message });
    })
}

//Funcion Login 
export function Login(req, res) {
    //Probando Login
    Auth.auth().signInWithEmailAndPassword(req.body.Email, req.body.Password).then(user => {
        //Obteniendo Token
        user.user.getIdToken(true).then(token => {
            user.user.sendEmailVerification();
            //Retorno respuesta
            return res.status(200).send({
                Token: token,
                Nombre: user.user.displayName,
                Foto: user.user.photoURL,
                Id: user.user.uid
            });
        }).catch(err => {
            //envio una respuesta
            return res.status(200).send({ Mensaje: 'Ok' });
        })
    }).catch(err => {
        //Error
        return res.status(406).send({ Error: err.message });
    })
}

//Verificar Token
export function VerficarToken(req, res) {
    //VERIFICO TOKEN
    VerficarTokenId(req.headers.token).then(user => {
        //SI NO HAY ERROR SIGUE LOGUEADO
        Firebase.auth().getUser(user.uid).then(user1 => {
            return res.status(200).send({ Nombre: user1.displayName, Foto: user1.photoURL, Token: req.headers.token });
        }).catch(err => {
            return res.status(203).send({ Mensaje: 'Ok' });
        })

    }).catch(err => {
        //Error
        if (err.message.includes('Firebase ID token has expired')) {
            Auth.auth().signInWithEmailAndPassword(req.headers.email, req.headers.password).then(user => {
                user.user.getIdToken().then(token => {
                    return res.status(202).send({ Nombre: user.user.displayName, Foto: user.user.photoURL, Token: token });
                }).catch(err => {
                    return res.status(401).send({ Error: 'Acceso no autorizado' });
                })
            });
        } else {
            return res.status(401).send({ Error: 'Acceso no autorizado' });
        }
    })
}

//PasswordRest
export function PasswordReset(req, res) {
    Auth.auth().sendPasswordResetEmail(req.body.Email).then(user => {
        return res.status(200).send({ Mensaje: 'Ok' });
    }).catch(err => {
        //Error
        return res.status(406).send({ Error: err.message });
    })
}

//ListarUsuarios
export function Listar(req, res) {
    VerficarTokenId(req.headers.token).then(valid => {
        Firebase.auth().listUsers(50, req.headers.page).then(List => {
            var Users = [];
            List.users.forEach(User => {
                if (valid.uid !== User.toJSON().uid) {
                    Users.push({ Nombre: User.toJSON().displayName, Foto: User.toJSON().photoURL, Id: User.toJSON().uid });
                }
            });
            return res.status(200).send({ Page: List.pageToken, Users: Users });
        }).catch(error => {
            return res.status(406).send({ Error: err.message });
        });
    }).catch(err => {
        return res.status(401).send({ Error: 'Acceso no autorizado' });
    })
}

//Cambiar Nombre
export function CambiarNombre(req, res) {
    VerficarTokenId(req.headers.token).then(valid => {
        Firebase.auth().updateUser(valid.uid, { displayName: req.body.Nombre }).then(value => {
            return res.status(200).send({ Nombre: value.displayName });
        }).catch(err => {
            return res.status(406).send({ Error: err.message });
        });
    }).catch(err => {
        return res.status(401).send({ Error: 'Acceso no autorizado' });
    });
}

//Borrar Cuenta
export function BorrarCuenta(req, res) {
    VerficarTokenId(req.headers.token).then(valid => {
        Firebase.auth().deleteUser(valid.uid).then(user => {
            Archivos.file(valid.uid).exists().then(ex => {
                if (ex) {
                    Archivos.file(valid.uid).delete().then(() => {
                        return res.status(200).send({ Mensaje: 'Ok' });
                    }).catch(err => {
                        return res.status(202).send({ Mensaje: 'Ok' });
                    })
                }
            }).catch(err => {
                return res.status(202).send({ Mensaje: 'Ok' });
            })
            return res.status(200).send({ Mensaje: 'Ok' });
        }).catch(err => {
            return res.status(406).send({ Error: err.message });
        })
    }).catch(err => {
        return res.status(401).send({ Error: 'Acceso no autorizado' });
    })
}

//Funcion para subir foto
export function SubirFoto(req, res) {
    if (!req.files.Archivo) {
        return res.status(406).send({ Error: 'Archivo no subido' });
    } else {
        if (req.files.Archivo.mimetype.includes('image')) {
            VerficarTokenId(req.headers.token).then(valid => {
                Archivos.file(valid.uid).save(req.files.Archivo.data, { metadata: { contentType: req.files.Archivo.mimetype }, contentType: req.files.Archivo.mimetype, public: true }).then(value => {
                    Archivos.file(valid.uid).get().then(url => {
                        Firebase.auth().updateUser(valid.uid, { photoURL: url['1'].mediaLink });
                        return res.status(200).send({ Url: url['1'].mediaLink });
                    }).catch(err => {
                        return res.status(202).send({ Mensaje: 'Ok' });
                    })
                }).catch(err => {
                    return res.status(406).send(req.files.Archivo);
                });
            }).catch(err => {
                return res.status(401).send({ Error: 'Acceso no autorizado' });
            })
        } else {
            return res.status(406).send({ Error: 'Archivo no es una imagen' });
        }
    }
}

//FUNCION PARA VERIFICAR
function VerficarTokenId(Token) {
    return Firebase.auth().verifyIdToken(Token);
}