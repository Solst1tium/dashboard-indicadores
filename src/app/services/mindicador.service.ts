import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { MindicadorResponse, SerieResponse } from '../models/mindicador.model';

@Injectable({ providedIn: 'root' })
export class MindicadorService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://mindicador.cl/api';

  // Estado reactivo
  readonly resumen = signal<MindicadorResponse | null>(null);
  readonly serieUf = signal<SerieResponse | null>(null);
  readonly serieDolar = signal<SerieResponse | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  cargarDatos(): void {
    this.loading.set(true);
    this.error.set(null);

    // forkJoin: ejecuta las 3 peticiones EN PARALELO y espera a que terminen
    forkJoin({
      resumen: this.http.get<MindicadorResponse>(this.BASE_URL),
      uf: this.http.get<SerieResponse>(`${this.BASE_URL}/uf`),
      dolar: this.http.get<SerieResponse>(`${this.BASE_URL}/dolar`)
    }).subscribe({
      next: ({ resumen, uf, dolar }) => {
        this.resumen.set(resumen);
        this.serieUf.set(uf);
        this.serieDolar.set(dolar);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con mindicador.cl. Verifica tu conexión.');
        this.loading.set(false);
      }
    });
  }
}