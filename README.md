# Backend Financiero (Ventas y Gastos)

Este proyecto consite en crear una API REST construida con **Node.js**, **Express** y **Sequelize** para gestionar y analizar datos financieros de ventas y gastos. Los datos se almacenan en la base de datos **PostgreSQL**.

---

## Objetivo

Permitir operaciones CRUD sobre ventas y gastos, y exponer endpoints que devuelvan métricas y balances para alimentar un dashboard financiero.

---

## Tecnologías utilizadas

* Node.js
* Express
* Sequelize ORM
* PostgreSQL
* dotenv
* nodemon

---

## 📁 Estructura de carpetas

```
/src
  /controllers
  /data
  /db
  /models
  /routes
  /utils

```

---

##  Scripts

```bash
npm install
npm start      # para iniciar el server con nodemon
```

---

## Endpoints

### Ventas - `/sales`

| Método | Ruta                | Descripción             |
| ------ | ------------------- | ----------------------- |
| GET    | `/sales`            | Listar todas las ventas |
| GET    | `/sales/:id`        | Obtener venta por ID    |
| PUT    | `/sales/update/:id` | Modificar venta por ID  |
| DELETE | `/sales/delete/:id` | Eliminar venta por ID   |

### 📈 Gastos - `/expenses`

| Método | Ruta              | Descripción                  |
| ------ | ----------------- | ---------------------------- |
| GET    | `/expenses`       | Métricas por fecha           |
| GET    | `/expenses/sales` | Métricas de ventas por fecha |

**Filtros (query params comunes):**

* `period=day|week|month|year`
* `from=YYYY-MM-DD&to=YYYY-MM-DD`

### 📆 Métricas - `/metrics`

| Método | Ruta               | Descripción                |
| ------ | ------------------ | -------------------------- |
| GET    | `/metrics/balance` | Balance ingresos - egresos |

**Ejemplo:**

```
GET /metrics/balance?period=month&from=2025-01-01&to=2025-12-31
```

---

## 📆 Modelos

### Sale

* id
* monto (decimal)
* fecha (date)
* categoria (string)
* descripcion (string)

### Expense

* id
* monto (decimal)
* fecha (date)
* categoria (string)
* descripcion (string)

---

## 📅 Carga inicial

Los archivos `ventas_500.json` y `gastos_500.json` están disponibles en `/src/data/` para poblar la base de datos.

---

## 🚀 Puesta en marcha

1. Configurar `.env` con tu base de datos PostgreSQL:

```env
PORT=3001
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
DB_HOST=...
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar servidor:

```bash
npm start
```

4. Acceder a la API en:

```
http://localhost:3001
```

---

## 📊 Ejemplo de uso

Consultar balance mensual:

```
GET /metrics/balance?period=month&from=2025-01-01&to=2025-12-31
```

Obtener métricas de ventas de la última semana:

```
GET /expenses/sales?period=week
```

---



