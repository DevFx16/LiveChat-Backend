//Importamos las librerias del proyecto
import Firebase from './Firebase';

//Funcion para registrar usuarios
export function Registrar(req, res) {
    //Creo usuario
    Firebase.auth().createUser({
        displayName: req.body.Nombre,
        email: req.body.Email,
        password: req.body.Contraseña,
        photoURL: req.body.Foto
    }).then(user => {
        //Creo el token
        Firebase.auth().createCustomToken(user.uid).then(token => {
            return res.status(200).send({
                Token: token,
                Nombre: user.displayName,
                Foto: user.photoURL
            });
        }).catch(err => {
            return res.status(202).send({ Mensaje: err.message });
        });
    }).catch(err => {
        //Error
        return res.status(406).send({ Error: err.message });
    })
}

export function CambiarNombre(req, res) {

}