const express = require("express");
const router = express.Router();
const expenseControllers = require("../controllers/expenseControllers");

router.get("/sales", expenseControllers.getSalesMetrics);
router.get("/", expenseControllers.getExpensesMetrics);

module.exports = router;
