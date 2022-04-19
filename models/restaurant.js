'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restaurant.belongsTo(models.Category)
      Restaurant.belongsToMany(models.User, { through: 'Reviews' })
    }
  }
  Restaurant.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Name is required"
        }
      }
    },
    address: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Category Id is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};