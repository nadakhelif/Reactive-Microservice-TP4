import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientInfoexport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  income: number;

  @Column()
  financialSituation: string;

  @Column()
  age: number;

  @Column()
  loanAmount: number;

  @Column()
  loanDuration: number;

  @Column()
  loanPurpose: string;

  @Column({ nullable: true })
  initialScoring: any;
}
