import { DataSource } from "typeorm";
import { Article } from "./entities/articleEntity";
import { Author } from "./entities/authorEntity";
import { Section } from "./entities/sectionEntity";
import { Sponsor } from "./entities/sponsorEntity";
import { Publicity } from "./entities/publicityEntity";
import { db_host, db_name, db_port, db_username, db_password } from "./config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: db_host,
  port: db_port,
  username: db_username,
  password: db_password,
  database: db_name,
  synchronize: true,
  entities: [Article, Author, Section, Sponsor, Publicity],
  // entities: ["entities/*.ts"],
  // logging: true,
});
