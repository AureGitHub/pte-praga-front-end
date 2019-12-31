import form_user from "./form-user";

let form_registro = form_user;

form_registro.push(
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
);


form_registro.push(
    {
        'name': 'repeat_password',
        'placeholder': 'Repite Contraseña',
        'type': 'password',
        'icon': 'pi pi-key',
        'validators': [
            {'name' : 'required', 'mensaje': 'Campo obligatorio'},
            {'name' : 'minlength', value : 6 , 'mensaje': 'Mínimo 6 caráteres'},
        ]
      }
);

export default form_registro;
