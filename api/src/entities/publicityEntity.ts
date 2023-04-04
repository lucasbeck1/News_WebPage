/* eslint-disable */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";

import { Sponsor } from "./sponsorEntity";

@Entity()
export class Publicity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column({ default: false })
  active: boolean;

  @Column({ default: false })
  finished: boolean;

  @Column({ type: "json" })
  payment: JSON;

  @Column()
  start: Date;

  @Column()
  finish: Date;

  @ManyToOne(() => Sponsor, (sponsor) => sponsor.publicities)
  sponsor: Sponsor;
}
