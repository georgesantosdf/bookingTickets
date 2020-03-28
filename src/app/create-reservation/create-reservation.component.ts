import { Component, OnInit } from '@angular/core';
import { CreateReservationService } from './create-reservation.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {

  constructor(
    private createReservationService: CreateReservationService,
  ) { }

  ngOnInit(): void {
  }

}
