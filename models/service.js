"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service.belongsTo(models.Category, {
        foreignKey: "categoryID",
        as: "CategoryDetails",
      });
    }
  }
  Service.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryID: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "category_id",
      },
      serviceName: {
        type: DataTypes.STRING,
        field: "service_name",
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("Normal", "VIP"),
        allowNull: false,
        defaultValue: "Normal",
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "created_by",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "updated_at",
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: "deleted_at",
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "Service",
    }
  );
  return Service;
};
