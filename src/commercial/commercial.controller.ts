import { Controller, Get, Param } from '@nestjs/common';
import { ClientInfo } from './entity/client-info.entity';
import { CommercialService } from './commercial.service';

@Controller('commercial')
export class CommercialController {
  constructor(private readonly commercialService: CommercialService) {}

  @Get(':clientId')
  async getClientData(
    @Param('clientId') clientId: string,
  ): Promise<ClientInfo> {
    return this.commercialService.getClientData(clientId);
  }
}
