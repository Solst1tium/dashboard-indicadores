import { Component, computed, input } from '@angular/core';
import { KpiSummary } from '../../models/indicator.model';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css'
})
export class KpiCardComponent {
  // Nueva forma de declarar inputs (señales de solo lectura)
  kpi = input.required<KpiSummary>();

  isPositive = computed(() => this.kpi().change >= 0);
}