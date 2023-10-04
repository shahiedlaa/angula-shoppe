import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent {

  @Input() control: FormControl;
  @Input() label: string;

  showErrors(){
    const {dirty,touched,errors} = this.control;
    return dirty && touched && errors;
  }
}
