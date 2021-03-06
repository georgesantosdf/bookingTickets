import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { finalize } from 'rxjs/operators';

import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';

import { CreateReservationService } from './create-reservation.service';
import { Reservation } from '../../core/entities/reservation';
import { Address } from '../../core/entities/address';
import { Movie } from '../../core/entities/movie';
import { FormValidations } from '../../shared/validators/form-validations';
import { PickDateAdapter, APP_DATE_FORMATS } from '../../shared/components/pickDateAdapter/pick-Date-Adapter';


@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
]
})
export class CreateReservationComponent  implements OnInit {
  @Output() address: Address;

  form: FormGroup;
  isChecked = false;
  checkBox  = false;

  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2020,0,1);

  date : any;

  faTwitter = faTwitter;
  faLinkedinIn = faLinkedinIn;
  faInstagram = faInstagram;
 
  movie: Movie;
  imageMovie: string;
  valueMovie:number;
  valueFrete:number;
  titleMovie:string;

  loading:boolean;

  reservation: Reservation;

  constructor(
    private formBuilder: FormBuilder,
    private createReservationService: CreateReservationService
  ) {  }

  ngOnInit(): void {
    this.setForm();
    this.obterMovieDB();

    this.valueMovie = 100;
    this.valueFrete = 2;
  }

  setForm(){
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
      email: [null, Validators.compose([Validators.required, FormValidations.validaEmail])],
      cpf: [null, Validators.compose([Validators.required, FormValidations.ValidaCpf])],
      birthDate: [null, [
        Validators.required
      ]],
      addressForm: this.formBuilder.group({
        cep: ['', [
          Validators.required,
          FormValidations.cepValidator
        ]],
        address: ['', [
          Validators.required
        ]],
        country: ['', [ Validators.required]],
        state: ['', [ Validators.required]],
        telephone: ['', [ Validators.required]]
      }),
      formWife: this.formBuilder.group({
        nameWife: [''],
          lastNameWife: [''],
          emailWife: [''],
          cpfWife:[''],
          birthDateWife: ['']
      })
    });
  }

  obterMovieDB(){
    this.loading = true;
    const language = "pt_BR";
    const page = "1";
    this.createReservationService.getMovieDB(language, page).pipe(
        finalize(() => {
          setTimeout(() => {
            this.loading = false;
          }, 250);
        })
      ).subscribe
      ((data:any) => { this.popularMovie(data) }, (error: any) => console.log('erro ao consultar Movie API') );
  }

  popularMovie(data:any){
     const language = "pt_BR";
      this.movie = data;
      this.titleMovie = this.movie.results[0].title;
      this.imageMovie = this.movie.results[0].poster_path;
  }

  onChecked(){
    this.isChecked= !this.isChecked;
    if( this.isChecked){
      this.form.get('formWife').get('nameWife').setValidators([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]); 
      this.form.get('formWife').get('lastNameWife').setValidators([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]); 
      this.form.get('formWife').get('emailWife').setValidators([
        Validators.required,
        FormValidations.validaEmail
      ]); 
      this.form.get('formWife').get('cpfWife').setValidators([Validators.required, FormValidations.ValidaCpf]); 
      this.form.get('formWife').get('birthDateWife').setValidators([Validators.required]); 

    }else{
      this.form.removeControl('formWife');
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
    if (this.form.valid) {
      const dadosFormulario = this.form.value;

      let dadosFormularioForWife: { nameWife: string; lastNameWife: string; cpfWife: string; birthDateWife: string; emailWife: string; };
      if(this.form.get('forWife')){
        const dadosFormularioForWife = this.form.get('forWife').value;
      }

      const dadosFormularioAddress = this.form.get('addressForm').value;

      const address = new Address (
        dadosFormularioAddress.cep,
        dadosFormularioAddress.address,
        dadosFormularioAddress.country,
        dadosFormularioAddress.state,
        dadosFormularioAddress.telephone
      )

      const reservation = new Reservation(
        dadosFormulario.name,
        dadosFormulario.lastName,
        dadosFormulario.cpf,
        dadosFormulario.birthDate,
        dadosFormulario.email,

        dadosFormularioForWife?.nameWife,
        dadosFormularioForWife?.lastNameWife,
        dadosFormularioForWife?.cpfWife,
        dadosFormularioForWife?.birthDateWife,
        dadosFormularioForWife?.emailWife,
        address
      );
      this.createReservationService.createReservation(reservation)
        .subscribe(
          res => {
            alert(`Reserva de Filme cadastrado com sucesso.`);
          },
          err => {  alert(`Erro ao cadastrar a reserva: ${err.message}`); }
        );
      this.form.reset();
    }else {
      this.verificaValidacoesForm(this.form);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }
}
