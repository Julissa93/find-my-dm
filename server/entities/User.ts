import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  Column,
} from "typeorm";
import Game from "./Game";
import Player from "./Player";
@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
   
  @Column()
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string; 

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => Player, (player) => player.user, {
    cascade: true,
    eager: true,
  })
  games: Player[];
}
