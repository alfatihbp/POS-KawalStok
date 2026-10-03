import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PosService } from '../../services/pos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-form.html',
  styleUrls: ['./order-form.css']
})
export class OrderForm implements OnInit {
  private fb = inject(FormBuilder);
  private posService = inject(PosService);
  private router = inject(Router);

  orderForm!: FormGroup;
  availableItems: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  ngOnInit(): void {
    this.initForm();
    this.loadItems();
  }

  initForm(): void {
    this.orderForm = this.fb.group({
      reseller: ['', [Validators.required]],
      lines: this.fb.array([])
    });
  }

  get lines(): FormArray {
    return this.orderForm.get('lines') as FormArray;
  }
  loadItems(): void {
    this.posService.getItems().subscribe({
      next: (items) => {
        this.availableItems = items;
        this.addLine();
      },
      error: (err) => {
        this.errorMessage = 'Gagal memuat daftar item.';
      }
    });
  }

  addLine(): void {
    const lineGroup = this.fb.group({
      item_id: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(1)]],
      unit_price: [0],
      is_promo: [false],
      discount_percent: [0],
      line_total: [0]
    });

    this.lines.push(lineGroup);
  }

  removeLine(index: number): void {
    if (this.lines.length > 1) {
      this.lines.removeAt(index);
    }
  }

  onItemChange(index: number): void {
    const line = this.lines.at(index);
    const selectedItemId = Number(line.get('item_id')?.value);
    const item = this.availableItems.find(i => i.id === selectedItemId);

    if (item) {
      line.patchValue({
        unit_price: item.price,
        is_promo: item.is_promo
      }, { emitEvent: false });

      this.recalculateLine(index);
    }
  }

  recalculateLine(index: number): void {
    const line = this.lines.at(index);
    const qty = Number(line.get('qty')?.value) || 0;
    const unitPrice = Number(line.get('unit_price')?.value) || 0;
    const isPromo = Boolean(line.get('is_promo')?.value);

    let discountPercent = 0;

    if (!isPromo) {
      if (qty >= 50) {
        discountPercent = 10;
      } else if (qty >= 10) {
        discountPercent = 5;
      }
    }

    const lineTotal = Math.floor((qty * unitPrice * (100 - discountPercent)) / 100);

    line.patchValue({
      discount_percent: discountPercent,
      line_total: lineTotal
    }, { emitEvent: false });
  }

  get grandTotal(): number {
    return this.lines.controls.reduce((sum, line) => {
      return sum + (Number(line.get('line_total')?.value) || 0);
    }, 0);
  }

  onSubmit(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    const formValue = this.orderForm.value;
    const payload = {
      reseller: formValue.reseller,
      status: 'draft',
      total: this.grandTotal,
      lines: formValue.lines.map((l: any) => ({
        item_id: Number(l.item_id),
        qty: Number(l.qty),
        unit_price: Number(l.unit_price),
        discount_percent: Number(l.discount_percent),
        line_total: Number(l.line_total)
      }))
    };

    this.posService.createOrder(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Pesanan draft berhasil dibuat!';
        this.orderForm.reset();
        this.lines.clear();
        this.addLine();
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Gagal membuat pesanan. Periksa stok item Anda.';
      }
    });
  }

  formatRupiah(amount: number): string {
    return 'Rp ' + (amount || 0).toLocaleString('id-ID');
  }
}