import {BaseEntity, Entity, PrimaryGeneratedColumn, ManyToMany, Column} from "typeorm";
import Game from "./Game";
@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
    
    @Column()
    password: string;

    @ManyToMany((type) => Game, (game) => game.players, {cascade: true, eager: true})
    games: Game[];
}