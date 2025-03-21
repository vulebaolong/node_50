import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Permissions from  "./Permissions.js";
import _Roles from  "./Roles.js";
import _Users from  "./Users.js";

export default function initModels(sequelize) {
  const Permissions = _Permissions.init(sequelize, DataTypes);
  const Roles = _Roles.init(sequelize, DataTypes);
  const Users = _Users.init(sequelize, DataTypes);

  Users.belongsTo(Roles, { as: "role", foreignKey: "roleId"});
  Roles.hasMany(Users, { as: "Users", foreignKey: "roleId"});

  return {
    Permissions,
    Roles,
    Users,
  };
}
