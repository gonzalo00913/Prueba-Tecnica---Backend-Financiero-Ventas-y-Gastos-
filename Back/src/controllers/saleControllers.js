const Sale = require("../models/sale");

// Obtener todas las ventas
const getAllSales = async (req, res, next) => {
  try {
    const sales = await Sale.findAll();
    res.json(sales);
  } catch (error) {
    next(error);
  }
};

// Obtener veta por ID
const getSaleById = async (req, res, next) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ error: "Sale not found" });
    res.json(sale);
  } catch (error) {
    next(error);
  }
};

// Crear una venta
const createSale = async (req, res, next) => {
  try {
    const { monto, fecha, categoria, descripcion } = req.body;
    const nuevaVenta = await Sale.create({
      monto,
      fecha,
      categoria,
      descripcion,
    });
    res.status(201).json(nuevaVenta);
  } catch (error) {
    next(error);
  }
};

// Modificar venta
const updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [updated] = await Sale.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: "Sale not found" });
    const ventaActualizada = await Sale.findByPk(id);
    res.json(ventaActualizada);
  } catch (error) {
    next(error);
  }
};

// Eliminar venta
const deleteSale = async (req, res, next) => {
  console.log("Por que carajos no se elimina?????:", req.params.id);
  try {
    const { id } = req.params;
    const deleted = await Sale.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Sale not found" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
};
