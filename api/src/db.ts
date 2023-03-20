import { DataSource } from "typeorm";
import { Article } from "./entities/articleEntity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root123456",
  database: "rocky_db",
  synchronize: true,
  entities: [Article],
  // logging: true,
  // entities: ["entities/*.ts"],
});
