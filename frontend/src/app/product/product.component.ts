import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsApiServiceService } from '../products-api-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  productForm = this.fb.group({
    name: ['', Validators.required],
    location: ['', Validators.required],
    price: [0, Validators.required],
  });
  options: string[] = [
    'მთავარი ოფისი',
    'კავეა გალერია',
    'კავეა თბილისი მოლი',
    'კავეა ისთ ფოინთი',
    'კავეა სითი მოლი',
  ];
  errorMessage = '';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productsApiService: ProductsApiServiceService
  ) {}

  onSubmit() {
    if (this.productForm.invalid) {
      alert('invalid information');
    } else {
      console.log(this.productForm.value);

      this.productsApiService
        .createProduct(
          this.productForm.value as {
            name: string;
            price: number;
            location: string;
          }
        )
        .subscribe(
          (response) => {
            // product creation successful, navigate to the products page
            this.router.navigate(['/']);
          },
          (error) => {
            console.log(error);
            // display an error message to the user
            alert(error.message);
          }
        );
    }
  }
}
