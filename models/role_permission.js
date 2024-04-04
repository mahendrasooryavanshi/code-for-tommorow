"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role_Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Role_Permission.belongsTo(models.Permissions, {
      //   foreignKey: "permissionId",
      //   as: "permissions",
      // });
    }
  }
  Role_Permission.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      // roleId: {
      //   type: DataTypes.BIGINT,
      //   references: {
      //     model: "Roles",
      //     key: "id",
      //   },
      //   field: "role_id",
      // },
      // permissionId: {
      //   type: DataTypes.BIGINT,
      //   references: {
      //     model: "permissions",
      //     key: "id",
      //   },
      //   field: "permission_id",
      // },

      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
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
        allowNull: false,
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      modelName: "Role_Permission",
    }
  );
  return Role_Permission;
};
