import { DataTypes } from "sequelize";
import sequelize from "../common/sequelize/connect.sequelize";

// SEQUELIZE (ORM)
const Permissions = sequelize.define(
   "Permissions",
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      endpoint: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      method: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      module: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      deletedBy: {
         type: DataTypes.INTEGER,
         allowNull: false,
         defaultValue: 0,
      },
      isDeleted: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false,
      },
      deletedAt: {
         type: "TIMESTAMP",
         allowNull: true,
         defaultValue: null,
      },
      createdAt: {
         type: "TIMESTAMP",
         defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
         allowNull: false,
      },
      updatedAt: {
         type: "TIMESTAMP",
         defaultValue: sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
         allowNull: false,
      },
   },
   {
      tableName: "Permissions",
      timestamp: false,
   }
);
// CODE FIRST
// đồng bộ code => db
Permissions.sync({ alter: true });

// DATABASE_URL FIRST
// đồng bộ từ db => code
// npx sequelize-auto -h localhost -d db_cyber_community -u root -x 1234 -p 3307  --dialect mysql -o src/models -a src/models/additional.json -l esm


export default Permissions