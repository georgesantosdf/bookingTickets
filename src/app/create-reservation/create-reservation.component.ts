import { Component, OnInit, Input } from '@angular/core';
import { CreateReservationService } from './create-reservation.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {
  isChecked = false;
  checkBox  = false;

  constructor(
    //private createReservationService: CreateReservationService
    
  ) { }

  ngOnInit(): void {
  }

  onChecked(e: { target: { checked: boolean; }; }){
    this.isChecked= e.target.checked;
  }

}
