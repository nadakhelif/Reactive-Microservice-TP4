/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RiskAssessment } from './entity/risk-assessment.entity';
import { CommercialService } from 'src/commercial/commercial.service';
import { BankService } from 'src/bank/bank.service';

@Injectable()
export class RiskManagementService {
  constructor(
    @InjectRepository(RiskAssessment)
    private riskAssessmentRepository: Repository<RiskAssessment>,
    // Hello here I'm injecting both of the services but in a real life microservice I will get that information with http request <3
    private commercialService: CommercialService,
    private bankingService: BankService,
  ) {}

  async assessRisk(
    clientId: string,
    initialScoring: any,
  ): Promise<RiskAssessment> {
    // Retrieve additional data from the Commercial Service's database
    const clientData = await this.commercialService.getClientData(clientId);

    // Retrieve the client's bank account details
    const bankAccount = await this.bankingService.findOne(clientId);

    // Perform the detailed risk assessment
    const finalScore = this.performRiskAssessment(
      clientData,
      initialScoring,
      bankAccount,
    );

    // Store the final score in the database
    const riskAssessment = new RiskAssessment();
    riskAssessment.clientId = clientId;
    riskAssessment.finalScore = finalScore;
    await this.riskAssessmentRepository.save(riskAssessment);

    // Send the final score to Kafka under the topic "final-risk-assessment-completed"

    return riskAssessment;
  }

  private performRiskAssessment(
    clientData: any,
    initialScoring: any,
    bankAccount: any,
  ): any {
    // logic behind the risk assessment
    return {};
  }
}
