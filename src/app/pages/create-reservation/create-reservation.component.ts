import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CreateReservationService } from './create-reservation.service';
import { Reservation } from '../../entities/reservation';
import { FormValidations } from '../../shared/erro-form/form-validations';
import { Address } from '../../entities/address';
import { Movie } from '../../entities/movie';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent  implements OnInit {
  @Output() address: Address;

  form: FormGroup;
  isChecked = false;
  checkBox  = false;
 
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
    const language = "pt_BR";
    const page = "1";
    this.createReservationService.getMovieDB(language, page).subscribe
      (data => { this.popularMovie(data) }, (error: any) => console.log('erro ao consultar Movie API') );
  }

  popularMovie(data:any){
      this.movie = data;
      console.log(this.movie);
  }

  onChecked(e: { target: { checked: boolean; }; }){
    this.isChecked= e.target.checked;
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
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]); 
      this.form.get('formWife').get('cpfWife').setValidators([Validators.required, FormValidations.ValidaCpf]); 
      this.form.get('formWife').get('birthDateWife').setValidators([Validators.required]); 

    }else{
        this.form.get('formWife').clearValidators;
    }
    this.form.get('formWife').updateValueAndValidity;
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

      const dadosFormularioForWife = this.form.get('forWife').value;

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

        dadosFormularioForWife.nameWife,
        dadosFormularioForWife.lastNameWife,
        dadosFormularioForWife.cpfWife,
        dadosFormularioForWife.birthDateWife,
        dadosFormularioForWife.emailWife,
        address
      );

      

      this.createReservationService.createReservation(reservation)
        .subscribe(
          res => {
            alert(`Reserva de Filme cadastrado com sucesso.`);
          },
          err => {  alert(`Erro ao cadastrar a reserva: ${err}`); }
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
