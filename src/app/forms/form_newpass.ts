const form_newpass =[
  {
    'name': 'uuid',
    'placeholder': 'codigo',
    'type': 'text',
    'icon': 'pi pi-key',
    'validators': [
        {'name' : 'required', 'mensaje': 'Campo obligatorio'},        
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
      },
      {
        'name': 'confirm_password',
        'placeholder': 'Repite Contraseña',
        'type': 'password',
        'icon': 'pi pi-key',
        'validators': [
            {'name' : 'required', 'mensaje': 'Campo obligatorio'},
            {'name' : 'minlength', value : 6 , 'mensaje': 'Mínimo 6 caráteres'},
            {'name' : 'confirm_password',  'mensaje': 'Contraseña y confirmación diferentes'},

        ]
      }
];


export default form_newpass;
