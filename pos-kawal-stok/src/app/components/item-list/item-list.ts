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
  updatingItems: Set<number> = new Set<number>();

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
        this.errorMessage = 'Gagal memuat daftar item. Pastikan API berjalan.';
        console.error('Error fetching items:', err);
      }
    });
  }

  incrementStock(item: any): void {
    this.updatingItems.add(item.id);
    this.posService.updateItemStock(item.id, 1).subscribe(res => {
        if (res.success) {
            item.stock = res.data.stock;
        }
        this.updatingItems.delete(item.id);
    });
  }

  decrementStock(item: any): void {
    if (item.stock > 0) {
        this.updatingItems.add(item.id);
        this.posService.updateItemStock(item.id, -1).subscribe(res => {
            if (res.success) {
                item.stock = res.data.stock;
            }
            this.updatingItems.delete(item.id);
        });
    }
  }

  formatRupiah(amount: number): string {
    return 'Rp ' + amount.toLocaleString('id-ID');
  }
}