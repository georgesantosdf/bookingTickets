import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddressFormService } from './address-form.service';
import { FormValidations } from '../erro-form/form-validations';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  address: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private addressFormService : AddressFormService,

  ) { }

  ngOnInit(): void {
    this.address = this.formBuilder.group({
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

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  consultaCEP(){
    let cep = this.address.get('address.cep').value;
    this.addressFormService.consultaCEP(cep, this.resetaDadosForm, this.address)
      .subscribe(dados => this.populaDadosForm(dados));
  }

  populaDadosForm(dados){
    this.address.patchValue({
      address: {
        cep: dados.cep,
        address: dados.logradouro + dados.bairro,
        country: dados.cidade,
        state: dados.estado,
        telephone: null
      }
    });
  }

  resetaDadosForm(form){
   form.patchValue({
      address: {
        cep: null,
        address: null,
        country: null,
        state: null,
        telephone: null
      }
    });
  }

  verificaValidTouched(campo: string) {
    return (
      !this.address.get(campo).valid &&
      (this.address.get(campo).touched || this.address.get(campo).dirty)
    );
  }

}
