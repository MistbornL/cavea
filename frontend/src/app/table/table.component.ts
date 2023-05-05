import { Component, OnInit } from '@angular/core';
import { ProductsApiServiceService } from '../products-api-service.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  rows: any[] = [];
  columns: any[] = [
    { prop: 'ID' },
    { prop: 'name' },
    { prop: 'location' },
    { prop: 'price' },
    { prop: 'actions' },
  ];
  data: { id: number; name: string; price: number; location: string }[] = [];
  faDelete = faTrash;
  constructor(private productsApiService: ProductsApiServiceService) {}

  ngOnInit(): void {
    this.productsApiService.getData().subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }

  deleteProduct(productId: number) {
    this.productsApiService.deleteProduct(productId).subscribe(() => {
      // Remove the deleted product from the data array
      this.data = this.data.filter((p) => p.id !== productId);
    });
  }
}
