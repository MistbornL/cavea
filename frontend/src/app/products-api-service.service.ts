import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class ProductsApiServiceService {
  constructor(private http: HttpClient) {}
  getData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products`);
  }
  createProduct(data: {
    name: string;
    price: number;
    location: string;
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/products`, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/products/${id}`);
  }
}
