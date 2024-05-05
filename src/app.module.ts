import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OcrService } from './ocr/ocr.service';
import { OcrModule } from './ocr/ocr.module';
import { CommercialModule } from './commercial/commercial.module';
import { RiskManagementResolver } from './risk-management/risk-management.resolver';
import { RiskManagementModule } from './risk-management/risk-management.module';
import { BankModule } from './bank/bank.module';

@Module({
  imports: [OcrModule, CommercialModule, RiskManagementModule, BankModule],
  controllers: [AppController],
  providers: [AppService, OcrService, RiskManagementResolver],
})
export class AppModule {}
