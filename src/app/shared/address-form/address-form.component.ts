import { Component, OnInit, Input } from '@angular/core';
import { AddressFormService } from './address-form.service';
import { Address } from 'src/app/core/entities/address';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormValidations } from '../erro-form/form-validations';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  @Input() address:Address;

  @Input() form: FormGroup;

  enderecoForm:FormGroup;

  optionsSelect: Array<any>;
  disabled: boolean = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private addressFormService : AddressFormService,

  ) { }

  ngOnInit(): void {
    this.optionsSelect = [
      { value: '1', label: 'Brasil' } ,
      { value: '2', label: 'Estados unidos' } ,
      { value: '3', label: 'Mexico' } ,
    ]; 
    this.enderecoForm = this.formBuilder.group({
      cep: ['', [
        Validators.required,
        FormValidations.cepValidator
      ]],
      address: ['', [
        Validators.required
      ]],
      country: ['Brasil', 'Estados Unidos'],
      state: ['DF'],
      telephone: ['']
    });
  }

  consultaCEP(){
    let cep = this.enderecoForm.get('cep').value;
    if(cep){
      this.addressFormService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados), (error: any) => console.log('erro ao consultar CEP'));
    }
  }

  populaDadosForm(dados:any){
      this.enderecoForm.patchValue({
          cep: dados.cep,
          address: dados.logradouro,
          country:  dados.localidade,
          state: dados.uf,
          telephone: ''
      });

    this.form.get('addressForm').setValue(this.enderecoForm);
    
    this.address = new Address(dados.cep, dados.address, dados.country, dados.state, dados.telephone);
  }

  verificaValidTouched(campo:any) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo:any) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }
}
