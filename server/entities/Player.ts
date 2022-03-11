import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    OneToMany,
    JoinTable,
  } from "typeorm";

  @Entity()
  export default class Player extends BaseEntity {
      @PrimaryGeneratedColumn()
      player_id: number;

      @Column()
      user_id: number; 

      @Column()
      game_id: number;

      @Column({ default: false })
      admin: boolean;

  }