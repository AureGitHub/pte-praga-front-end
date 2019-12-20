import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemHeroService implements InMemoryDbService {
  createDb() {

    const partidos  = [
      {id : 1, idcreador: 1, dia: '2019-12-15', hora: '10:30', duracion: 2, pistas : 2, jugadorestotal: 8, jugadoresapuntados : 3},
      {id : 2, idcreador: 2, dia: '2019-12-05', hora: '18:30',  duracion: 1.5, pistas : 1, jugadorestotal: 4, jugadoresapuntados : 1},
      {id : 3, idcreador: 3, dia: '2019-12-16', hora: '10:00',  duracion: 2, pistas : 3, jugadorestotal: 12, jugadoresapuntados : 7},
      {id : 4, idcreador: 1, dia: '2019-12-07', hora: '17:30',  duracion: 1.5, pistas : 1, jugadorestotal: 4, jugadoresapuntados : 1},
    ];

    const perfil  = [
      {id : 1, descripcion: 'admin'},
      {id : 2, descripcion: 'jugador'}
    ];
    const posicion  = [
      {id : 1, descripcion: 'Drive'},
      {id : 2, descripcion: 'Reves'}
    ];
    const users = [
      {id : 1 , idperfil: 1 , email : 'admin@a.es',  password: '123456', nombre : 'nombre1', idposicion : 1, token : 'no112144344545mbre1'},
      {id : 2 , idperfil: 2 , email : 'noadmin@a.es',  password: '123456',nombre : 'nombre2', idposicion : 2, token : 'no112144344545mbre1'},
      {id : 3 , idperfil: 2 , email : 'a@a.es',  password: '123456',nombre : 'jose aurelio de sande', idposicion : 2, token : 'no112144344545mbre1'}

    ];

    const  partidoxjugador = [
      {id : 1 , idpartido : 1,  idjugador : 1},
      {id : 2 , idpartido : 1,  idjugador : 2},
      {id : 3 , idpartido : 1,  idjugador : 3},
      {id : 4 , idpartido : 3,  idjugador : 1},
    ];




    return {users, posicion, perfil, partidos,partidoxjugador};
  }
}
