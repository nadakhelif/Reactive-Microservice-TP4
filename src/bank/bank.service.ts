import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from './entity/bankAccounT.entity';


@Injectable()
export class BankService {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
  ) {}

  findAll(): Promise<BankAccount[]> {
    return this.bankAccountRepository.find();
  }

  findOne(id: string): Promise<BankAccount> {
    return this.bankAccountRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.bankAccountRepository.delete(id);
  }

  async create(bankAccount: BankAccount): Promise<BankAccount> {
    return this.bankAccountRepository.save(bankAccount);
  }
}