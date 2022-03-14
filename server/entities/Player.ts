import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from "typeorm";
import Game from "./Game";
import User from "./User";

@Entity()
export default class Player extends BaseEntity {
  @PrimaryColumn()
  player_id: number;

  @PrimaryColumn()
  game_id: number;

  @Column({ default: false })
  admin: boolean;

  @ManyToOne((type) => User, (user) => user.games, {primary: true})
  @JoinColumn({name: "player_id"})
  user: User;

  @ManyToOne((type) => Game, game => game.players, {primary: true})
  @JoinColumn({name: "game_id"})
  game: Game;
}
