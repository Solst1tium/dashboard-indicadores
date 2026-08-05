import { Injectable, computed, signal } from '@angular/core';
import { Indicator, KpiSummary } from '../models/indicator.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  // ===== Datos (en un caso real vendrían de una API con HttpClient) =====
  private readonly indicators = signal<Indicator[]>([
    { id: 1, name: 'Ventas Totales',      category: 'Comercial',   value: 1250000, target: 1500000, unit: 'CLP',     trend: 'up',     date: '2026-07-01' },
    { id: 2, name: 'Clientes Activos',    category: 'Comercial',   value: 342,     target: 400,     unit: 'clientes', trend: 'up',     date: '2026-07-15' },
    { id: 3, name: 'Tasa de Conversión',  category: 'Marketing',   value: 3.8,     target: 5,       unit: '%',        trend: 'down',   date: '2026-07-20' },
    { id: 4, name: 'Tiempo de Respuesta', category: 'Operaciones', value: 2.3,     target: 2,       unit: 'hrs',      trend: 'stable', date: '2026-07-10' },
    { id: 5, name: 'Satisfacción',        category: 'Operaciones', value: 4.2,     target: 4.5,     unit: '/5',       trend: 'up',     date: '2026-07-25' },
    { id: 6, name: 'Pedidos Completados', category: 'Operaciones', value: 890,     target: 1000,    unit: 'pedidos',  trend: 'up',     date: '2026-07-28' },
    { id: 7, name: 'Costo por Adquisición', category: 'Marketing', value: 15000,   target: 12000,   unit: 'CLP',      trend: 'down',   date: '2026-07-05' },
    { id: 8, name: 'NPS Score',           category: 'Comercial',   value: 72,      target: 80,      unit: 'pts',      trend: 'up',     date: '2026-07-30' }
  ]);

  readonly kpis = signal<KpiSummary[]>([
    { label: 'Ingresos Totales',  value: '$1.25M', change: 12.5,  icon: 'pi pi-dollar' },
    { label: 'Clientes Activos',  value: '342',    change: 8.3,   icon: 'pi pi-users' },
    { label: 'Pedidos',           value: '890',    change: -2.1,  icon: 'pi pi-shopping-cart' },
    { label: 'Satisfacción',      value: '4.2/5',  change: 5.7,   icon: 'pi pi-star' }
  ]);

  // ===== Estado de los filtros (también con signals) =====
  readonly searchTerm = signal('');
  readonly selectedCategory = signal<string | null>(null);
  readonly dateRange = signal<Date[]>([]);

  // ===== Datos derivados: se recalculan solos cuando cambia algo =====
  readonly categories = computed(() =>
    [...new Set(this.indicators().map(i => i.category))]
  );

  readonly filteredIndicators = computed(() => {
    let result = this.indicators();

    const term = this.searchTerm().toLowerCase();
    if (term) {
      result = result.filter(i => i.name.toLowerCase().includes(term));
    }

    const category = this.selectedCategory();
    if (category) {
      result = result.filter(i => i.category === category);
    }

    const range = this.dateRange();
    if (range.length === 2 && range[0] && range[1]) {
      result = result.filter(i => {
        const d = new Date(i.date);
        return d >= range[0] && d <= range[1];
      });
    }

    return result;
  });

  // ===== Métodos para modificar el estado =====
  setSearchTerm(value: string)      { this.searchTerm.set(value); }
  setCategory(value: string | null) { this.selectedCategory.set(value); }
  setDateRange(range: Date[])       { this.dateRange.set(range); }

  clearFilters() {
    this.searchTerm.set('');
    this.selectedCategory.set(null);
    this.dateRange.set([]);
  }
}