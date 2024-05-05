import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';

@Module({
  providers: [BankService],
  controllers: [BankController]
})
export class BankModule {}
