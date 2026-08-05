import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';

import { DashboardService } from './services/dashboard.service';
import { KpiCardComponent } from './components/kpi-card/kpi-card';
import { ChartsPanelComponent } from './components/charts-panel/charts-panel';
import { IndicatorsTableComponent } from './components/indicators-table/indicators-table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe, KpiCardComponent, ChartsPanelComponent, IndicatorsTableComponent],
 templateUrl: './app.html',
  styleUrls: ['./app.css'],
 
})
export class AppComponent {
  service = inject(DashboardService);
  today = new Date();
}