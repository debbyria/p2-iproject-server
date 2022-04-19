'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reviews.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "User Id is required"
        }
      }
    },
    visitDate: DataTypes.DATE,
    comment: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    RestaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Restaurant Id is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};