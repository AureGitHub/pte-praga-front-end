import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/components/alert.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {


  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy',
    defaultOpen: true
};
  myFormGroup: FormGroup;

  es: any;

  @Input() formDataTemplate: any;
  @Input() formButtonLabel: any;
  @Input() formButtonIcon: any;

  ButtonLabel = 'Guardar';
  ButtonIcon = 'pi pi-save';


  @Output() EventEmitterForm: EventEmitter<any> = new EventEmitter();

  constructor(
    private alertService: AlertService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {

    this.es = {
      // date
      closeText: 'Cerrar',
      prevText: '<Ant',
      nextText: 'Sig>',
      currentText: 'Hoy',
      monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun',
      'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      weekHeader: 'Sm',
      dateFormat: 'dd/mm/yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ''

  };

    this.crearForm();
    this.setButtonSubmit();
  }

  setButtonSubmit() {
    if (this.formButtonLabel != null) {
      this.ButtonLabel = this.formButtonLabel;
    }
    if (this.formButtonIcon != null) {
      this.ButtonIcon = this.formButtonIcon;
    }
  }


   passwordMatchValidator(group: FormGroup): any {
    if (group) {
      if (group.get('password').value !== group.get('confirm_password').value) {
        return { notMatching : true };
      }
    }

    return null;
  }

  crearForm() {
    if (this.formDataTemplate == null) { return; }
    const group = {};
    this.formDataTemplate.forEach(input => {
      const newControl = new FormControl('');

      if (input.validators) {
        const validators = [];
        input.validators.forEach(validator => {
            switch (validator.name) {
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

              case 'max':
                validators.push(Validators.compose([Validators.max(validator.value)]));
              break;

              case 'min':
                validators.push(Validators.compose([Validators.min(validator.value)]));
              break;

              case 'confirm_password':
                // validators.push(Validators.compose([this.passwordMatchValidator]));
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
    return this.myFormGroup.controls[controlName].dirty && this.myFormGroup.controls[controlName].hasError(errorName);
  }

  public MyhasError = (controlName: string, errorName: string) => {
    return this.myFormGroup.controls[controlName].dirty && this.myFormGroup.controls[controlName].hasError(errorName);
  }

  public SetFormData(data) {


    this.myFormGroup.reset({});

    const arrControl = [];

    // tslint:disable-next-line:forin
    for (const control  in this.myFormGroup.controls) {
      arrControl.push(control);
    }

    for (const prop in data) {

      if (arrControl.find(a => a === prop )) {

        const input_template_fecha = this.formDataTemplate.find(a => a.name === prop);


        if (input_template_fecha.type === 'calendar') {

          // lo muestro en español... lo convierto a inglish para poder setarlo al calendar
          const hora = data[prop].split(' ')[1];
          const anno = data[prop].split(' ')[0].split('-')[2];
          const mes = data[prop].split(' ')[0].split('-')[1];
          const dia = data[prop].split(' ')[0].split('-')[0];

          //this.myFormGroup.get('dia').setValue(new Date(anno + '-' + mes + '-' + dia + ' ' + hora));
          this.myFormGroup.get(prop).setValue(data[prop]);


        } else {
          this.myFormGroup.get(prop).setValue(data[prop]);

        }
      }



    }

    // this.myFormGroup.reset(data);
    // this.myFormGroup.get('dia').setValue(new Date('2019-10-10'));

  }


}

