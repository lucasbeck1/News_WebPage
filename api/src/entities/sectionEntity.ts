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
export class Section extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Article, (article) => article.section)
  articles: Article[];
}
