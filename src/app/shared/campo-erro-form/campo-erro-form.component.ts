import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campo-erro-form',
  templateUrl: './campo-erro-form.component.html',
  styleUrls: ['./campo-erro-form.component.css']
})
export class CampoErroFormComponent implements OnInit {

  @Input() msgErro: string;
  @Input() mostrarErro: boolean;

  constructor() { }

  ngOnInit() {
  }

}
