# 📊 Dashboard de Indicadores

Aplicación dashboard construida con **Angular 20** y **PrimeNG**, con dos vistas:
indicadores operacionales/comerciales (OMS) e indicadores económicos de Chile
en tiempo real desde la API pública **mindicador.cl**.

## 🌐 Demo en vivo

👉 [https://Solst1tium.github.io/dashboard-indicadores/](https://Solst1tium.github.io/dashboard-indicadores/)

## ✨ Características

- **Dashboard OMS**
  - Tarjetas KPI con variación porcentual
  - Gráficos de línea y dona con Chart.js
  - Tabla con búsqueda, filtro por categoría, rango de fechas, ordenamiento y paginación
- **Indicadores Económicos**
  - Consumo de API real (mindicador.cl) con `HttpClient` y `forkJoin`
  - Manejo de estados *loading / error / éxito*
  - Gráficos con series de los últimos 30 días (UF y Dólar)
- **Arquitectura**
  - Standalone components + lazy loading con `loadComponent`
  - Signals (`signal`, `computed`) para todo el flujo de datos
  - Nuevo control flow (`@if`, `@for`, `@switch`)
  - Servicios con `inject()` y diseño de tokens CSS encapsulados
  - Tema oscuro con preset Aura de PrimeNG

## 🛠️ Stack

| Tecnología | Uso |
|------------|-----|
| Angular 20 | Framework |
| PrimeNG | Componentes UI (Table, Select, DatePicker, Chart…) |
| Chart.js | Gráficos |
| RxJS | Peticiones en paralelo (`forkJoin`) |
| CSS + design tokens | Estilos encapsulados por componente |

## 🚀 Instalación local

```bash
git clone https://github.com/Solst1tium/dashboard-indicadores.git
cd dashboard-indicadores
npm install
ng serve
```

Abre `http://localhost:4200`

## 📦 Deploy

Publicado en **GitHub Pages** con build estático:

```bash
ng build --base-href=/dashboard-indicadores/
npx angular-cli-ghpages --dir=dist/dashboard-indicadores/browser
```

## 👩💻 Autora

**Solange Leiva** — Desarrolladora Front-End
[GitHub](https://github.com/Solst1tium)
