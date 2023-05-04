import { Component, OnInit } from '@angular/core';
import { ProductsApiServiceService } from '../products-api-service.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  faplus = faPlus;
  constructor(public router: Router) {}
}
