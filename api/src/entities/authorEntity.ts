/* eslint-disable */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";

import { Article } from "./articleEntity";

@Entity()
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  mail: string;

  @Column()
  password: string;

  @Column()
  admin: boolean;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];
}
