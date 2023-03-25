/* eslint-disable */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { Author } from "./authorEntity";
import { Section } from "./sectionEntity";

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  headline: string;

  @Column({ type: "text" })
  drophead: string;

  @Column({ type: "text" })
  body: string;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Author, (author) => author.articles)
  author: Author;

  @ManyToOne(() => Section, (section) => section.articles)
  section: Section;
}
