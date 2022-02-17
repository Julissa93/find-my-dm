import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable} from "typeorm";
import Game from "./Game";
import GameTags from "./GameTags";

@Entity()
export default class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    tag_name: String;

    @OneToMany(() => GameTags, gameTags => gameTags.tag, {cascade: true})
    game_tags: GameTags
}