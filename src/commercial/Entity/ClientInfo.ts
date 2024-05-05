import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  income: number;

  @Column()
  financialSituation: string;

  @Column({ nullable: true })
  initialScoring: any;
}