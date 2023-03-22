import { DataSource } from "typeorm";
import { Article } from "./entities/articleEntity";
import { Author } from "./entities/authorEntity";
import { Section } from "./entities/sectionEntity";
import { Sponsor } from "./entities/sponsorEntity";
import { Publicity } from "./entities/publicityEntity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root123456",
  database: "rocky_db",
  synchronize: true,
  entities: [Article, Author, Section, Sponsor, Publicity],
  // logging: true,
  // entities: ["entities/*.ts"],
});
