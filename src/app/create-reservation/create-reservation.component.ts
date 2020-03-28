import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateReservationService } from './create-reservation.service';
import { Reservation } from '../entities/reservation';
import { Movie } from '../entities/movie';
import { FormValidations } from '../shared/erro-form/form-validations';
import { Address } from '../entities/address';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent  implements OnInit {
  @Output() address: Address;

  form: FormGroup;
  addressForm:FormGroup;
  isChecked = false;
  checkBox  = false;
 
  movies: Movie[];
  movie: Movie;

  reservation: Reservation;

  constructor(
    private formBuilder: FormBuilder,
    private createReservationService: CreateReservationService
  ) {  }

  ngOnInit(): void {
    this.obterMovieDB();

    this.form = this.formBuilder.group({
      name: [null,  Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])],
      lastName: [null,  Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])],
      email: [null, Validators.compose([Validators.email])],
      cpf: [null, Validators.compose([Validators.required, FormValidations.ValidaCpf])],
      birthDate: [null],
      addressForm: this.formBuilder.group({
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
      })
    });
  }
  
  verificaValidAddressTouched() {
    return (
      !this.addressForm.get(this.address.cep).valid &&
      (this.addressForm.get(this.address.cep).touched || this.addressForm.get(this.address.cep).dirty)
    );
  }

  obterMovieDB(){
    const language = "pt_BR";
    const page = "1";
    this.createReservationService.getMovieDB(language, page)
      .subscribe(data => {
        this.movies = data});
    console.log(this.movies);
  }

  onChecked(e: { target: { checked: boolean; }; }){
    this.isChecked= e.target.checked;
    if( this.isChecked){
        this.form = this.formBuilder.group({
          formWife: this.formBuilder.group({
            nameWife: [null,  Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100)
            ])],
            lastNameWife: [null,  Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100)
            ])],
            emailWife: [null, [
              Validators.required,
              Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]],
            cpfWife: [null, Validators.compose([Validators.required, FormValidations.ValidaCpf])],
            birthDateWife: [null]
          }),

        });
    }else{
      this.form = this.formBuilder.group({
        formWife: this.formBuilder.group({
          nameWife: [null],
          lastNameWife: [null],
          emailWife: [null],
          cpfWife: [null],
          birthDateWife: [null]
        }),

      });
    }
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  enviarDados(){
    const dadosFormulario = this.form.value;

    const reservation = new Reservation(
      dadosFormulario.name,
      dadosFormulario.lastName,
      dadosFormulario.cpf,
      dadosFormulario.birthDate,
      dadosFormulario.email,

      dadosFormulario.nameWife,
      dadosFormulario.lastNameWife,
      dadosFormulario.cpfWife,
      dadosFormulario.birthDateWife,
      dadosFormulario.emailWife,
      dadosFormulario.address
    );

     

    this.createReservationService.createReservation(reservation)
      .subscribe(
        res => {
          alert(`Reserva de Filme cadastrado com sucesso.`);
        },
        err => {  alert(`Erro ao cadastrar a reserva: ${err}`); }
      );

    this.form.reset();
  }

}
