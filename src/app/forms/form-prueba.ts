const form_prueba = [
    {
      'name': 'nombre',
      'placeholder': 'Nombre',
      'type': 'textBox',
      'icon': 'pi pi-user',
      'validators_resumen': ['required', 'minlength', 'maxlength'],
      'validators_message': 'Campo obligatorio. Tamaño del campo: mínimo 5 caracteres y máximo 10',
      'validators': [
          {'name' : 'required'},
          {'name' : 'minLength', value : 5},
          {'name' : 'maxLength', value : 10},
      ]
    },
    {
      'name': 'titulo',
      'placeholder': 'Titulo',
      'type': 'select',
      'icon': 'pi pi-key',
      'options': [
                  {'label': 'selcciona'},
                  {'label': 'Uno', 'value': 1},
                  {'label': 'Dos', 'value': 2},
                  {'label': 'Tres', 'value': 3}],
    'validators_resumen': ['required'],
    'validators_message': 'Campo obligatorio.',
      'validators': [
          {'name' : 'required'}
      ]
    }
  ];
  export default form_prueba;
