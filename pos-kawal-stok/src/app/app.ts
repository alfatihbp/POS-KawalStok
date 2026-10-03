import { Component } from '@angular/core';
import { ItemList } from './components/item-list/item-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItemList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'pos-kawal-stok';
}