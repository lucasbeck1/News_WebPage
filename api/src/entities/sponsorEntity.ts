/* eslint-disable */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";

import { Publicity } from "./publicityEntity";

@Entity()
export class Sponsor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mail: string;

  @Column()
  password: string;

  @OneToMany(() => Publicity, (publicity) => publicity.sponsor)
  publicities: Publicity[];
}
