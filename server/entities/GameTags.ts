import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import Game from "./Game";
import Tag from "./Tag";

@Entity()
export default class GameTags extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tagId: number;

    @Column()
    gameId: number;

    @ManyToOne(() => Game, game => game.game_tags, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate:'CASCADE'
      })
    game: Game;

    @ManyToOne(() => Tag, tag => tag.game_tags)
    tag: Tag;
}
