'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Product, { foreignKey: 'product_id', as: 'Product' });
    }
  };
  Order.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Products',
        key: 'id',
        as: 'product_id'
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    delivery: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      default: 'Ordered',
      validate: {
        isIn: {
          args: [['Cancelled', 'Ordered']],
          msg: 'Invalid Category, uses Cancelled or Ordered only'
        }
      }
    },
    total_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};