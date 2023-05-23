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
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  mail: string;

  @Column()
  password: string;

  @OneToMany(() => Publicity, (publicity) => publicity.sponsor)
  publicities: Publicity[];
}
