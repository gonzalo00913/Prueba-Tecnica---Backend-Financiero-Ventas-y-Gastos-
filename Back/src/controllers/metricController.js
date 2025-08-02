const { Op, fn, col, literal } = require("sequelize");
const Sale = require("../models/sale");
const Expense = require("../models/expense");

const groupByFormat = {
  day: "%Y-%m-%d",
  week: "%Y-%W",
  month: "%Y-%m",
  year: "%Y",
};

const getFinancialBalance = async (req, res, next) => {
  try {
    const period = req.query.period || "month";
    const from = req.query.from;
    const to = req.query.to;

    const format = groupByFormat[period] || groupByFormat["month"];

    const whereFilter = {};
    if (from && to) {
      whereFilter.fecha = { [Op.between]: [from, to] };
    }

    const sales = await Sale.findAll({
      where: whereFilter,
      attributes: [
        [fn("to_char", col("fecha"), format), "period"],
        [fn("sum", col("monto")), "ingresos"],
      ],
      group: [literal("period")],
      raw: true,
    });

    const expenses = await Expense.findAll({
      where: whereFilter,
      attributes: [
        [fn("to_char", col("fecha"), format), "period"],
        [fn("sum", col("monto")), "egresos"],
      ],
      group: [literal("period")],
      raw: true,
    });

    const dataMap = {};

    sales.forEach((sale) => {
      const period = sale.period;
      if (!dataMap[period]) dataMap[period] = { ingresos: 0, egresos: 0 };
      dataMap[period].ingresos = parseFloat(sale.ingresos);
    });

    expenses.forEach((expense) => {
      const period = expense.period;
      if (!dataMap[period]) dataMap[period] = { ingresos: 0, egresos: 0 };
      dataMap[period].egresos = parseFloat(expense.egresos);
    });

    const result = Object.entries(dataMap).map(([period, values]) => ({
      period,
      ingresos: values.ingresos,
      egresos: values.egresos,
      balance: values.ingresos - values.egresos,
    }));

    result.sort((a, b) => a.period.localeCompare(b.period));

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFinancialBalance,
};
