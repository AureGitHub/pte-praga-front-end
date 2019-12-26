export const form_partido = [
  {
    'name': 'id',
    'type': 'hidden'
  },

  {
    'name': 'idcreador',
    'type': 'hidden'
  },
  {
    'name': 'dia',
    'placeholder': 'Dia',
    'type': 'calendar',
    'icon': 'pi pi-calendar',
    'validators': [
      {'name' : 'required', 'mensaje': 'Campo obligatorio'}
    ]
  },



  {
    'name': 'duracion',
    'placeholder': 'Duración',
    'type': 'number',
    'icon': 'pi pi-clock',
    'validators': [
      {'name' : 'required', 'mensaje': 'Campo obligatorio'},
      {'name' : 'max', value : 4, 'mensaje': 'Máxima duración 4 horas'},
      {'name' : 'min', value : 0.5, 'mensaje': 'Mínima duración 0.5 (media hora)'},
    ]
  },

  {
    'name': 'pistas',
    'placeholder': 'Pistas',
    'type': 'number',
    'icon': 'fa verde fa-square',
    'validators': [
      {'name' : 'required', 'mensaje': 'Campo obligatorio'},
      {'name' : 'max', value : 4, 'mensaje': 'Máximo 4 pistas'},
    ]
  },
  {
    'name': 'jugadorestotal',
    'placeholder': 'Total jugadores',
    'type': 'number',
    'icon': 'pi pi-users',
    'validators': [
      {'name' : 'required', 'mensaje': 'Campo obligatorio'}
    ]
  },

  ];

