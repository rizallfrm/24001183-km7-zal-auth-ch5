"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      // Define association with User model
      this.belongsTo(models.User, { foreignKey: "createdBy", as: "creator" });
      this.belongsTo(models.User, { foreignKey: "updatedBy", as: "updater" });
      this.belongsTo(models.User, { foreignKey: "deletedBy", as: "deleter" });
    }
  }

  Car.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users", // Make sure this matches the User model name in the database
          key: "id",
        },
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      deletedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Car",
    },
    {
      timestamps: true,
    },
  );

  return Car;
};
