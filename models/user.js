"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Car, { foreignKey: "createdBy", as: "createdCars" });
      this.hasMany(models.Car, { foreignKey: "updatedBy", as: "updatedCars" });
      this.hasMany(models.Car, { foreignKey: "deletedBy", as: "deletedCars" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // Mengatur agar ID di-generate otomatis
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("superadmin", "admin", "member"),
        defaultValue: "member",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
    }
  );

  return User;
};
