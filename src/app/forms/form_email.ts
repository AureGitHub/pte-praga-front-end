const form_email = [
    {
      'name': 'email',
      'placeholder': 'Email',
      'type': 'email',
      'icon': 'pi pi-envelope',
      'validators': [
          {'name' : 'required', 'mensaje': 'Campo obligatorio'},
          {'name' : 'email', 'mensaje': 'Formato de email incorrecto'}
      ]
    }
  ]; 
  export default form_email; 

