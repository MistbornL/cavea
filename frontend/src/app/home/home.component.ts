import { Component, OnInit } from '@angular/core';
import { ProductsApiServiceService } from '../products-api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  rows: any[] = [];
  columns: any[] = [
    { prop: 'name' },
    { prop: 'location' },
    { prop: 'price' },
    { prop: 'actions' },
  ];
  data = [];
  constructor(private productsApiService: ProductsApiServiceService) {}

  ngOnInit(): void {
    this.productsApiService.getData().subscribe((data) => {
      this.data = data;
    });
  }
}
