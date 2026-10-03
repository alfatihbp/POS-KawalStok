import { Component } from '@angular/core';
import { ItemList } from './components/item-list/item-list';
import { OrderForm } from './components/order-form/order-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItemList, OrderForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'pos-kawal-stok';
}