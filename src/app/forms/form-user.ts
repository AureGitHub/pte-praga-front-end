const form_user = [
  {
    'name': 'id',
    'type': 'hidden'
  },

  {
    'name': 'alias',
    'placeholder': 'Alias',
    'type': 'text',
    'icon': 'pi pi-user',
    'validators': [
      {'name' : 'required', 'mensaje': 'Campo obligatorio'},
      {'name' : 'minlength', value : 3 , 'mensaje': 'Mínimo 3 caráteres'},
      {'name' : 'maxlength', value : 10 , 'mensaje': 'Másimo 10 caráteres'},
    ]
  },

    {
      'name': 'email',
      'placeholder': 'Email',
      'type': 'email',
      'icon': 'pi pi-envelope',
      'validators': [
          {'name' : 'required', 'mensaje': 'Campo obligatorio'},
          {'name' : 'email', 'mensaje': 'Formato de email incorrecto'}
      ]
    },    
    {
      'name': 'nombre',
      'placeholder': 'Nombre',
      'type': 'text',
      'icon': 'pi pi-user',
      'validators': [
        {'name' : 'required', 'mensaje': 'Campo obligatorio'},
        {'name' : 'minlength', value : 5 , 'mensaje': 'Mínimo 10 caráteres'},
        {'name' : 'maxlength', value : 50 , 'mensaje': 'Másimo 50 caráteres'},
      ]
    },

    {
      'name': 'idposicion',
      'placeholder': 'Posición',
      'type': 'dropdown',
      'icon': 'pi pi-map-marker',
      'options': [],
      'validators': [
        {'name' : 'required', 'mensaje': 'Campo obligatorio'}
      ]
    },

    {
      'name': 'idperfil',
      'placeholder': 'Perfil',
      'type': 'dropdown',
      'icon': 'pi pi-lock',
      'options': [],
      'validators': [
        {'name' : 'required', 'mensaje': 'Campo obligatorio'}
      ]
    },

    {
      'name': 'idestado',
      'placeholder': 'Estado',
      'type': 'dropdown',
      'icon': 'fa fa-smile-o',
      'options': [],
      'validators': [
        {'name' : 'required', 'mensaje': 'Campo obligatorio'}
      ]
    },

  ];
  export default form_user;
