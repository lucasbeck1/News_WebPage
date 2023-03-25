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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mail: string;

  @Column()
  password: string;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];
}
