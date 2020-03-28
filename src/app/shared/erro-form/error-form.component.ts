import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidations } from './form-validations';

@Component({
  selector: 'app-error-form',
  templateUrl: './error-form.component.html',
  styleUrls: ['./error-form.component.css']
})
export class ErrorFormComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

  get errorMessage() {

    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched) {
          return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
        }
    }

    return null;
  }

}