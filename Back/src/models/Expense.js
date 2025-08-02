const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Expense = sequelize.define(
  "Expense",
  {
    external_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    proveedor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "expenses",
    timestamps: false,
  }
);

module.exports = Expense;
