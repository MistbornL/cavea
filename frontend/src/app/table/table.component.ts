import { Component, OnInit } from '@angular/core';
import { ProductsApiServiceService } from '../products-api-service.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable, map } from 'rxjs';
import { NgModel } from '@angular/forms';
import { FormControl } from '@angular/forms';

interface DataProps {
  id: number;
  name: string;
  price: number;
  location: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  page = 1;
  itemsPerPage = 20;
  rows: any[] = [];
  columns: any[] = [
    { prop: 'ID' },
    { prop: 'name' },
    { prop: 'location' },
    { prop: 'price' },
    { prop: 'actions' },
  ];
  data: DataProps[] = [];
  faDelete = faTrash;
  locationFilter = new FormControl('');
  selectedLocation = '';
  locations: string[] = [
    'მთავარი ოფისი',
    'კავეა გალერია',
    ' კავეა თბილისი მოლი',
    ' კავეა ისთ ფოინთი',
    ' კავეა სითი მოლი',
  ];
  constructor(private productsApiService: ProductsApiServiceService) {}

  ngOnInit(): void {
    this.productsApiService.getData().subscribe((data) => {
      this.data = data;
      this.locations = Array.from(new Set(data.map((p: any) => p.location)));
    });
    this.locationFilter.valueChanges.subscribe((value) => {
      this.selectedLocation = value ?? '';
    });
  }

  deleteProduct(productId: number) {
    this.productsApiService.deleteProduct(productId).subscribe(() => {
      // Remove the deleted product from the data array
      this.data = this.data.filter((p) => p.id !== productId);
    });
  }

  get pagedRows(): Observable<any[]> {
    return this.productsApiService.getData().pipe(
      map((data: DataProps[]) => {
        const startIndex = (this.page - 1) * this.itemsPerPage;
        return data.slice(startIndex, startIndex + this.itemsPerPage);
      })
    );
  }

  get filteredData(): any[] {
    if (!this.selectedLocation) {
      return this.data;
    }
    return this.data.filter((p) => p.location === this.selectedLocation);
  }
}
