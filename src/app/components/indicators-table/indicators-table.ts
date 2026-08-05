import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';

// PrimeNG
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { DashboardService } from '../../services/dashboard.service';
import { Indicator } from '../../models/indicator.model';

@Component({
  selector: 'app-indicators-table',
  standalone: true,
  imports: [
    FormsModule,
    TableModule, TagModule, ProgressBarModule, ButtonModule,
    SelectModule, DatePickerModule, InputTextModule,
    IconFieldModule, InputIconModule,
    DecimalPipe, DatePipe
  ],
  templateUrl: './indicators-table.html',
  styleUrls: ['./indicators-table.css']

})
export class IndicatorsTableComponent {
  service = inject(DashboardService);

  // Opciones para el select, derivadas de los datos
  categoryOptions = computed(() =>
    this.service.categories().map(c => ({ label: c, value: c }))
  );

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.service.setSearchTerm(value);
  }

  onCategoryChange(event: { value: string | null }): void {
    this.service.setCategory(event.value ?? null);
  }

  onRangeChange(range: Date[] | null): void {
    this.service.setDateRange(range ?? []);
  }

  getProgress(indicator: Indicator): number {
    return Math.min(Math.round((indicator.value / indicator.target) * 100), 100);
  }

  getSeverity(category: string): 'success' | 'info' | 'warn' {
    const map: Record<string, 'success' | 'info' | 'warn'> = {
      'Comercial': 'success',
      'Marketing': 'info',
      'Operaciones': 'warn'
    };
    return map[category] ?? 'info';
  }
}