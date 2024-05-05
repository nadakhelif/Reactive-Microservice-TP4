import { Injectable } from '@nestjs/common';

@Injectable()
export class OcrService {
  private performOCR(document): any {
    //some treatment then return the object that needs to be returned so it will probably be a json 
    return document.json;
  }
}
