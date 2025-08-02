const express = require("express");
const router = express.Router();
const metricController = require("../controllers/metricController");

router.get("/balance", metricController.getFinancialBalance);

module.exports = router;
