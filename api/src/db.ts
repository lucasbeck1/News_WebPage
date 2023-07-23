import { DataSource } from "typeorm";
import * as entities from "./entities/_index";
import {
  db_host,
  db_name,
  db_port,
  db_username,
  db_password,
} from "./config/keys.config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: db_host,
  port: db_port,
  username: db_username,
  password: db_password,
  database: db_name,
  synchronize: true,
  entities: entities,
  // logging: true,
});
