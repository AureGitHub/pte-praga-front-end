import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/components/alert.service';
import form_prueba from 'src/app/forms/form-prueba';


@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {


  myFormGroup: FormGroup;


  @Input() formDataTemplate: any;
  @Input() formButtonLabel: any;
  @Input() formButtonIcon: any;

  ButtonLabel = 'Guardar';
  ButtonIcon = 'pi pi-save';


  @Output() EventEmitterForm: EventEmitter<any> = new EventEmitter();

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.crearForm();
    this.setButtonSubmit();
  }

  setButtonSubmit(){
    if (this.formButtonLabel != null) {
      this.ButtonLabel = this.formButtonLabel;
    }
    if (this.formButtonIcon != null) {
      this.ButtonIcon = this.formButtonIcon;
    }
  }

  crearForm(){
    if(this.formDataTemplate == null) { return; }
    const group = {};
    this.formDataTemplate.forEach(input => {
      const newControl = new FormControl('');

      if(input.validators){
        const validators = [];
        input.validators.forEach(validator => {
            switch(validator.name) {
              case 'required':
                validators.push(Validators.required);
              break;
              case 'email':
                validators.push(Validators.email);
              break;
              case 'minlength':
                validators.push(Validators.compose([Validators.minLength(validator.value)]));
              break;

              case 'maxlength':
                validators.push(Validators.compose([Validators.maxLength(validator.value)]));
              break;

            }
        });
        newControl.setValidators(validators);
      }

      group[input.name] = newControl;
    });

    this.myFormGroup = new FormGroup(group);

    

  }

  onsubmit() {

    this.alertService.clear();
    if (this.myFormGroup.valid) {
      this.EventEmitterForm.emit(this.myFormGroup.value);

    } else {
      this.alertService.error('Errores en el formulario');
    }

  }

  public hasErrorGroup = (controlName: string, lsterrorName: string[]) => {
    if (lsterrorName == null || this.myFormGroup == null) { return false; }
    let retbool = false;
    lsterrorName.forEach(item => {
      retbool = retbool || (this.myFormGroup.controls[controlName].dirty && this.myFormGroup.controls[controlName].hasError(item));
    });

    return retbool;
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.myFormGroup.controls[controlName].hasError(errorName);
  }

  public SetFormData(data){
    this.myFormGroup.reset(data);
  }


}
