

import form_jugador from './form_jugador';

let form_detalle_jugador = form_jugador;

form_detalle_jugador = form_detalle_jugador.filter(a => a.name !== 'idperfil');
form_detalle_jugador = form_detalle_jugador.filter(a => a.name !== 'idestado');


export default form_detalle_jugador;
