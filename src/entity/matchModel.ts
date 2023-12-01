import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class MatchEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  player1!: string;

  @Column("varchar")
  player2!: string;

  @Column("varchar")
  winner!: string;

  @Column("varchar")
  loser!: string;

  @CreateDateColumn()
  date!: Date;
}
