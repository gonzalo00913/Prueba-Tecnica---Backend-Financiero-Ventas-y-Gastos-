const Expense = require("../models/expense");
const Sale = require("../models/sale");
const { Op, fn, col, literal } = require("sequelize");

const parsePeriod = (period) => {
  const today = new Date();
  const start = new Date();

  switch (period) {
    case "day":
      start.setDate(today.getDate() - 1);
      break;
    case "week":
      start.setDate(today.getDate() - 7);
      break;
    case "month":
      start.setMonth(today.getMonth() - 1);
      break;
    case "year":
      start.setFullYear(today.getFullYear() - 1);
      break;
    default:
      return null;
  }

  return {
    from: start.toISOString().slice(0, 10),
    to: today.toISOString().slice(0, 10),
  };
};

const getAggregatedData = async (Model, fechaField, from, to) => {
  return await Model.findAll({
    attributes: [
      [fn("DATE", col(fechaField)), "fecha"],
      [fn("SUM", col("monto")), "monto_total"],
    ],
    where: {
      [fechaField]: {
        [Op.between]: [from, to],
      },
    },
    group: [fn("DATE", col(fechaField))],
    order: [[literal("fecha"), "ASC"]],
    raw: true,
  });
};

const getSalesMetrics = async (req, res, next) => {
  try {
    const { period, from, to } = req.query;

    let range = parsePeriod(period);
    if (from && to) range = { from, to };
    if (!range) return res.status(400).json({ error: "Parámetros inválidos" });

    const data = await getAggregatedData(Sale, "fecha", range.from, range.to);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getExpensesMetrics = async (req, res, next) => {
  try {
    const { period, from, to } = req.query;

    let range = parsePeriod(period);
    if (from && to) range = { from, to };
    if (!range) return res.status(400).json({ error: "Parámetros inválidos" });

    const data = await getAggregatedData(
      Expense,
      "fecha",
      range.from,
      range.to
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSalesMetrics,
  getExpensesMetrics,
};
