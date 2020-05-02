
import form_pass_confim from './form_pass_confim';
import form_jugador from './form_jugador';

let form_registro = form_jugador;

form_registro = form_registro.filter(a => a.name !== 'idperfil');
form_registro = form_registro.filter(a => a.name !== 'idestado');
form_registro = form_registro.filter(a => a.name !== 'id');

const form_pass_confim_ = form_pass_confim;


form_registro = form_registro.concat(form_pass_confim_);

form_registro.push({ 'name': 'registrojugador', 'type': 'hidden' });

export default form_registro;
