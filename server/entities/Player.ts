import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import Game from "./Game";
import User from "./User";

@Entity()
export default class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  player_id: number;

  @Column({ default: false })
  admin: boolean;

  @ManyToOne((type) => User, (user) => user.games)
  user: User;

  @ManyToOne((type) => Game, game => game.players)
  game: Game;
}
