import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import Game from "./Game";

@Entity()
export default class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    tag_name: String;

    @ManyToMany((type) => Game, {cascade: true})
    game_tags: Game[];
}