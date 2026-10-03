import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosService } from '../../services/pos.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.html',
  styleUrls: ['./item-list.css']
})
export class ItemList implements OnInit {
  private posService = inject(PosService);

  items: any[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.posService.getItems().subscribe({
      next: (data) => {
        this.items = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Gagal memuat daftar item. Pastikan Mock API berjalan.';
        console.error('Error fetching items:', err);
      }
    });
  }

  formatRupiah(amount: number): string {
    return 'Rp ' + amount.toLocaleString('id-ID');
  }
}