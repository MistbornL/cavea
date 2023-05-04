import { Component, OnInit } from '@angular/core';
import { ProductsApiServiceService } from '../products-api-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
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
