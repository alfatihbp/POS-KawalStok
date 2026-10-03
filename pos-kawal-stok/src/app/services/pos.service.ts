import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PosService {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:3000';

    private mockItems = [
        { id: 1, name: 'Beras Pandan Wangi 5kg', price: 65000, stock: 100, is_promo: false },
        { id: 2, name: 'Minyak Goreng Sunco 2L', price: 35000, stock: 50, is_promo: true },
        { id: 3, name: 'Gula Pasir Gulaku 1kg', price: 15000, stock: 200, is_promo: false },
        { id: 4, name: 'Indomie Goreng (Karton)', price: 110000, stock: 30, is_promo: true },
        { id: 5, name: 'Telur Ayam 1kg', price: 28000, stock: 80, is_promo: false }
    ];
    private mockOrders: any[] = [];

    getItems(): Observable<any[]> {
        return of(this.mockItems);
    }

    updateItemStock(id: number, change: number): Observable<any> {
        const item = this.mockItems.find(i => i.id === id);
        if (item) {
            item.stock += change;
            if (item.stock < 0) item.stock = 0;
            return of({ success: true, data: item });
        }
        return of({ success: false });
    }

    getOrders(): Observable<any[]> {
        return of(this.mockOrders);
    }

    createOrder(payload: any): Observable<any> {
        for (const line of payload.lines) {
            const item = this.mockItems.find(i => i.id === line.item_id);
            if (!item) {
                return throwError(() => ({ error: { message: `Item dengan ID ${line.item_id} tidak ditemukan.` } }));
            }
            if (item.stock < line.qty) {
                return throwError(() => ({ error: { message: `Stok ${item.name} tidak mencukupi! Sisa stok: ${item.stock}` } }));
            }
        }

        for (const line of payload.lines) {
            const item = this.mockItems.find(i => i.id === line.item_id);
            if (item) {
                item.stock -= line.qty;
            }
        }

        const newOrder = {
            id: this.mockOrders.length + 1,
            ...payload
        };
        this.mockOrders.push(newOrder);

        return of({ success: true, message: 'Order created', data: newOrder });
    }
}