import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OcrService } from './ocr/ocr.service';
import { OcrModule } from './ocr/ocr.module';
import { CommercialModule } from './commercial/commercial.module';

@Module({
  imports: [OcrModule, CommercialModule],
  controllers: [AppController],
  providers: [AppService, OcrService],
})
export class AppModule {}
