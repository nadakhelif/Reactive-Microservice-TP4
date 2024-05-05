import { Module } from '@nestjs/common';
import { RiskManagementService } from './risk-management.service';

@Module({
  providers: [RiskManagementService]
})
export class RiskManagementModule {}
