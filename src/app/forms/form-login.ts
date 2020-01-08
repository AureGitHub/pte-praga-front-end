const form_login = [

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
      'name': 'password',
      'placeholder': 'Contraseña',
      'type': 'password',
      'icon': 'pi pi-key',
      'validators': [
          {'name' : 'required', 'mensaje': 'Campo obligatorio'},
          {'name' : 'minlength', value : 6 , 'mensaje': 'Mínimo 6 caráteres'},
      ]
    }
  ];
  export default form_login;
