import { Routes } from '@angular/router';
import { OrderForm } from './components/order-form/order-form';
import { OrderList } from './components/order-list/order-list';
import { ItemList } from './components/item-list/item-list';

export const routes: Routes = [
    { path: '', redirectTo: 'create-order', pathMatch: 'full' },
    { path: 'create-order', component: OrderForm },
    { path: 'orders', component: OrderList },
    { path: 'items', component: ItemList },
    { path: '**', redirectTo: 'create-order' }
];