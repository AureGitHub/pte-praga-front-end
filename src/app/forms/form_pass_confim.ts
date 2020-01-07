const form_pass_confim =[
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


export default form_pass_confim;
