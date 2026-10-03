import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PosService {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:3000'; // Sesuaikan URL Mock API BSI

    getItems(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/items`);
    }

    getOrders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/orders`);
    }

    createOrder(payload: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/orders`, payload);
    }
}