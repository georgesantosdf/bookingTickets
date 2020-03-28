import { Component, OnInit, Input } from '@angular/core';
import { AddressFormService } from './address-form.service';
import { Address } from 'src/app/entities/address';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  @Input() address:Address;
  constructor(
    private addressFormService : AddressFormService,

  ) { }

  ngOnInit(): void {
  }

  consultaCEP(e: { target: { cep: string; }; }){
    let cep= e.target.cep;
    console.log("consultaCEP");
    this.addressFormService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados));
  }

  populaDadosForm(dados){
    this.address = new Address(dados.cep, dados.address, dados.country, dados.state, dados.telephone);
  }

}
