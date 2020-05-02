
import form_pass_confim from './form_pass_confim';
let form_passOlvidada = [
  {
    'name': 'uuid',
    'placeholder': 'codigo',
    'type': 'text',
    'icon': 'pi pi-key',
    'validators': [
        {'name' : 'required', 'mensaje': 'Campo obligatorio'},
    ]
  }];
  form_passOlvidada = form_passOlvidada.concat(form_pass_confim);
export default form_passOlvidada;
