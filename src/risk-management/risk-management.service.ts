import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RiskAssessment } from './Entity/risk-assessment.entity';
import { CommercialService } from 'src/commercial/commercial.service';

@Injectable()
export class RiskManagementService {
  constructor(
    @InjectRepository(RiskAssessment)
    private riskAssessmentRepository: Repository<RiskAssessment>,
    private commercialService: CommercialService,
  ) {}

  async assessRisk(clientId: string, initialScoring: any): Promise<RiskAssessment> {
    // Retrieve additional data from the Commercial Service's database
    const clientData = await this.commercialService.getClientData(clientId);

    // Perform the detailed risk assessment
    const finalScore = this.performRiskAssessment(clientData, initialScoring);

    // Store the final score in the database
    const riskAssessment = new RiskAssessment();
    riskAssessment.clientId = clientId;
    riskAssessment.finalScore = finalScore;
    await this.riskAssessmentRepository.save(riskAssessment);

    // Send the final score to Kafka under the topic "final-risk-assessment-completed"

    return riskAssessment;
  }

  private performRiskAssessment(clientData: any, initialScoring: any): any {
    // logic behind the risk assessment 
    return {};
  }
}