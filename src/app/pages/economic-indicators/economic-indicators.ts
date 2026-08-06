import { Component, OnInit, computed, inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

import { MindicadorService } from '../../services/mindicador.service';
import { KpiCardComponent } from '../../components/kpi-card/kpi-card';
import { KpiSummary } from '../../models/indicator.model';
import { SerieResponse } from '../../models/mindicador.model';

@Component({
  selector: 'app-economic-indicators',
  standalone: true,
  imports: [ChartModule, ButtonModule, KpiCardComponent],
  templateUrl: './economic-indicators.html',
  styleUrls: ['./economic-indicators.css']
})
export class EconomicIndicators implements OnInit {
  service = inject(MindicadorService);
  router = inject(Router);

  ngOnInit(): void {
    if (!this.service.resumen()) {
      this.service.cargarDatos();
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  // Reutilizamos las tarjetas KPI del dashboard con datos reales
  kpis = computed<KpiSummary[]>(() => {
    const r = this.service.resumen();
    if (!r) return [];
    return [
      { label: 'UF',     value: this.clp(r.uf.valor),    change: this.variacion(this.service.serieUf()),    icon: 'pi pi-wallet' },
      { label: 'Dólar',  value: this.clp(r.dolar.valor), change: this.variacion(this.service.serieDolar()), icon: 'pi pi-dollar' },
      { label: 'Euro',   value: this.clp(r.euro.valor),  change: 0, icon: 'pi pi-euro' },
      { label: 'IPC',    value: `${r.ipc.valor}%`,       change: 0, icon: 'pi pi-percentage' }
    ];
  });

  ufChart = computed(() => this.buildChart(this.service.serieUf(), '#2563eb'));
  dolarChart = computed(() => this.buildChart(this.service.serieDolar(), '#22c55e'));

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: '#64748b', maxTicksLimit: 6 }, grid: { color: 'rgba(51,65,85,.4)' } },
      y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(51,65,85,.4)' } }
    }
  };

  // Toma los últimos 30 días y los ordena cronológicamente
  private buildChart(serie: SerieResponse | null, color: string) {
    if (!serie) return null;
    const ultimos30 = serie.serie.slice(0, 30).reverse();
    return {
      labels: ultimos30.map(p => this.fechaCorta(p.fecha)),
      datasets: [{
        label: serie.nombre,
        data: ultimos30.map(p => p.valor),
        borderColor: color,
        backgroundColor: color + '22',
        fill: true,
        tension: 0.3
      }]
    };
  }

  // Variación % entre hoy y ayer
  private variacion(serie: SerieResponse | null): number {
    if (!serie || serie.serie.length < 2) return 0;
    const [hoy, ayer] = serie.serie;
    return +(((hoy.valor - ayer.valor) / ayer.valor) * 100).toFixed(2);
  }

  private clp(valor: number): string {
    return '$' + valor.toLocaleString('es-CL', { maximumFractionDigits: 2 });
  }

  private fechaCorta(fecha: string): string {
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit' });
  }
}