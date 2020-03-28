import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddressFormService } from './address-form.service';
import { Address } from 'src/app/util/address';
import { FormValidations } from '../erro-form/form-validations';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  address: Address;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private addressFormService : AddressFormService,

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cep: ['', [
        Validators.required,
        FormValidations.cepValidator
      ]],
      address: ['', [
        Validators.required
      ]],
      country: [],
      state: [],
      telephone: []
     
    });
  }

}
