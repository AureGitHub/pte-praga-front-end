
import form_pass_confim from './form_pass_confim';
import form_jugador from './form_jugador';

let form_registro = form_jugador;

form_registro = form_registro.filter(a => a.name !== 'idperfil');
form_registro = form_registro.filter(a => a.name !== 'idestado');

const form_pass_confim_ = form_pass_confim;


form_registro.concat(form_pass_confim_);

export default form_registro;
