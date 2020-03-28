import { Component, OnInit } from '@angular/core';
import { AddressFormService } from './address-form.service';
import { Address } from 'src/app/util/address';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  address: Address;
  constructor(
    //private addressFormService : AddressFormService,

  ) { }

  ngOnInit(): void {
    
  }

}
