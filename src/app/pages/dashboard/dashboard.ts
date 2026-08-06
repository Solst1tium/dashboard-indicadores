import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { KpiCardComponent } from '../../components/kpi-card/kpi-card';
import { ChartsPanelComponent } from '../../components/charts-panel/charts-panel';
import { IndicatorsTableComponent } from '../../components/indicators-table/indicators-table';


@Component({
  selector: 'app-dashboard',
  imports: [DatePipe, KpiCardComponent, ChartsPanelComponent, IndicatorsTableComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  service = inject(DashboardService);
  today = new Date();
}
