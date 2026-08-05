import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-charts-panel',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './charts-panel.html',
  styleUrls: ['./charts-panel.css']
})
export class ChartsPanelComponent implements OnInit {
  lineData: any;
  lineOptions: any;
  doughnutData: any;
  doughnutOptions: any;

  ngOnInit(): void {
    // Gráfico de línea
    this.lineData = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Ventas',
          data: [850, 920, 1050, 980, 1150, 1200, 1250],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Objetivo',
          data: [900, 950, 1000, 1100, 1200, 1300, 1500],
          borderColor: '#64748b',
          borderDash: [5, 5],
          fill: false,
          tension: 0.4
        }
      ]
    };

    this.lineOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#94a3b8' } } },
      scales: {
        x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(51, 65, 85, 0.4)' } },
        y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(51, 65, 85, 0.4)' } }
      }
    };

    // Gráfico de dona
    this.doughnutData = {
      labels: ['Comercial', 'Marketing', 'Operaciones'],
      datasets: [{
        data: [45, 25, 30],
        backgroundColor: ['#2563eb', '#7c3aed', '#06b6d4'],
        borderWidth: 0
      }]
    };

    this.doughnutOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 20 } }
      }
    };
  }
}