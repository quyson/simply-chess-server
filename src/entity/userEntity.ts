import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum Rank {
  Wood = "Wood",
  Iron = "Iron",
  Bronze = "Bronze",
  Silver = "Silver",
  Gold = "Gold",
  Platinum = "Platinum",
  Ruby = "Ruby",
  Sapphire = "Sapphire",
  Emerald = "Emerald",
  Pearl = "Pearl",
  Diamond = "Diamond",
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  username!: string;

  @Column("varchar")
  password!: string;

  @Column({ type: "int", default: 0 })
  elo!: number;

  @Column({ type: "enum", enum: Rank })
  rank!: Rank;
}
