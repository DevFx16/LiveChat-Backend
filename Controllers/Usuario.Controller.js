import Firebase from './Firebase';


export function Registrar(req, res) {
    return res.status(200).send(Firebase.app().name);
}

export function CambiarNombre(req, res){

}