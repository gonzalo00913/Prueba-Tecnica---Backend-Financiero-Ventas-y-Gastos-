const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleControllers");

router.get("/", saleController.getAllSales);
router.get("/:id", saleController.getSaleById);
router.post("/", saleController.createSale);
router.put("/update/:id", saleController.updateSale);
router.delete("/delete/:id", saleController.deleteSale);

module.exports = router;
