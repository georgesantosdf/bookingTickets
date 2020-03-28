import { Component, OnInit, Input } from '@angular/core';
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
  @Input() address: Address;

  form: FormGroup;
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
      birthDate: [null]
    });
  }

  obterMovieDB(){
    const language = "pt_BR";
    const page = "1";
    this.createReservationService.getMovieDB(language, page)
      .subscribe(response => ( this.movies = response.body));

   // this.movie = this.movies[0];
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
