export interface IndicadorResumen {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: string;
  valor: number;
}

// Respuesta de https://mindicador.cl/api
export interface MindicadorResponse {
  fecha: string;
  uf: IndicadorResumen;
  dolar: IndicadorResumen;
  euro: IndicadorResumen;
  utm: IndicadorResumen;
  ipc: IndicadorResumen;
}

export interface PuntoSerie {
  fecha: string;
  valor: number;
}

// Respuesta de https://mindicador.cl/api/uf o /api/dolar
export interface SerieResponse {
  codigo: string;
  nombre: string;
  serie: PuntoSerie[];
}