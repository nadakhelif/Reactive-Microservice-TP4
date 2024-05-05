import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RiskAssessment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: string;

  @Column()
  finalScore: any;
}
