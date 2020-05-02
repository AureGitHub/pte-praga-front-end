
import form_pass_confim from './form_pass_confim';
let form_passCambiar = [
  {
    'name': 'oldpassword',
    'placeholder': 'Contraseña antigua',
    'type': 'password',
    'icon': 'pi pi-key',
    'validators': [
        {'name' : 'required', 'mensaje': 'Campo obligatorio'},
        {'name' : 'minlength', value : 6 , 'mensaje': 'Mínimo 6 caráteres'},
    ]
  },];
  form_passCambiar = form_passCambiar.concat(form_pass_confim);
export default form_passCambiar;
