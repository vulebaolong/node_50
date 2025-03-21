import { Sequelize } from "sequelize";
import initModels from "../../models/init-models";

const sequelize = new Sequelize("mysql://root:1234@localhost:3307/db_cyber_community");
export const models = initModels(sequelize)

try {
   await sequelize.authenticate();
   console.log("Connection has been established successfully.");
} catch (error) {
   console.error("Unable to connect to the database:", error);
}

export default sequelize;
