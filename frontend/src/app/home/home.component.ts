import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  rows: any[] = [];
  columns: any[] = [
    { prop: 'name' },
    { prop: 'location' },
    { prop: 'price' },
    { prop: 'actions' },
  ];
}
