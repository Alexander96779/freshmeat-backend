'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Product.hasMany(models.Order, { foreignKey: 'product_id', as: 'products' });
    }
  };
  Product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter title'
        },
        notEmpty: {
          args: true,
          msg: 'Title is not allowed to be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter description'
        },
        notEmpty: {
          args: true,
          msg: 'Description is not allowed to be empty'
        }
      }
    }, 
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter image url'
        },
        notEmpty: {
          args: true,
          msg: 'Image url is not allowed to be empty'
        }
      }
    },
    unit_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    status: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'In Stock',
      validate: {
        isIn: {
          args: [['In Stock', 'Sold Out']],
          msg: 'Invalid Category, uses In Stock or Sold Out only'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};