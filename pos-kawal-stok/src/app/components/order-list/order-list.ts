import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosService } from '../../services/pos.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css']
})
export class OrderList implements OnInit {
  private posService = inject(PosService);

  orders: any[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.posService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Gagal memuat daftar pesanan.';
        console.error('Error fetching orders:', err);
      }
    });
  }

  formatRupiah(amount: number): string {
    return 'Rp ' + (amount || 0).toLocaleString('id-ID');
  }

  getStatusStyle(status: string): { [key: string]: string } {
    switch (status?.toLowerCase()) {
      case 'submitted':
        return { backgroundColor: '#feebc8', color: '#7b341e' };
      case 'fulfilled':
        return { backgroundColor: '#c6f6d5', color: '#22543d' };
      case 'cancelled':
        return { backgroundColor: '#fed7d7', color: '#9b2c2c' };
      default:
        return { backgroundColor: '#e2e8f0', color: '#4a5568' };
    }
  }
}