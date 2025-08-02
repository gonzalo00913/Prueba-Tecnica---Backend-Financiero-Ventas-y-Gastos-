const express = require("express");
const app = express();
const middleware = require("./utils/middleware")


const saleRoutes = require("./routes/saleRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const metricRotes = require("./routes/metricsRoutes")

app.use(express.json());

app.use("/sales", saleRoutes);
app.use("/expenses", expenseRoutes);
app.use("/metrics", metricRotes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler)

module.exports = app;