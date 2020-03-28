import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateReservationService } from './create-reservation.service';
import { Reservation } from '../util/reservation';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent  implements OnInit {
  form: FormGroup;
  isChecked = false;
  checkBox  = false;

  reservation: Reservation = new Reservation();

  constructor(
    private formBuilder: FormBuilder
    //private createReservationService: CreateReservationService
    
  ) {  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.minLength(3)
      ]],
      lastName: [null, [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: [null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      cpf: [null, [
        Validators.required,
        Validators.minLength(11)
      ]],
      birthDate: [null]
    });
  }

  onChecked(e: { target: { checked: boolean; }; }){
    this.isChecked= e.target.checked;
    if( this.isChecked){
        this.form = this.formBuilder.group({
          formWife: this.formBuilder.group({
            nameWife: [null, [
              Validators.required,
              Validators.minLength(3)
            ]],
            lastNameWife: [null, [
              Validators.required,
              Validators.minLength(3)
            ]],
            emailWife: [null, [
              Validators.required,
              Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]],
            cpfWife: [null, [
              Validators.required,
              Validators.minLength(11)
            ]],
            birthDateWife: [null]
          }),

        });
    }
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

}
