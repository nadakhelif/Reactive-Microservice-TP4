import { Injectable } from '@nestjs/common';
import { ClientInfo } from './Entity/client-info.entity';

@Injectable()
export class CommercialService {
  constructor(
    @InjectRepository(ClientInfo)
    private clientRepository: Repository<ClientInfo>,
  ) {
    // Listen to the "client-information-processed" topic in Kafka
  }

  async checkEligibility(data: any): Promise<void> {
    // Retrieve the client's old data from the database
    const client = await this.clientRepository.findOne(data.clientId);

    // Perform the initial eligibility check
    // This is a placeholder - the actual implementation will depend on your business logic
    const initialScoring = this.performEligibilityCheck(client, data);

    // Store the initial scoring in the database
    client.initialScoring = initialScoring;
    await this.clientRepository.save(client);

    // Send a message to Kafka under the topic "initial-scoring-completed"
  }

  private performEligibilityCheck(client: ClientInfo): number {
    const salary = client.salary;
    const financialSituation = client.financialSituation;
    const age = client.age;
    const loanAmount = client.loanAmount;
    const loanDuration = client.loanDuration;
    const loanPurpose = client.loanPurpose;
    const initialScore = client.initialScore;

    if (age < 20) {
      initialScore += 0;
    } else if (age < 40) {
      initialScore += 20;
    } else if (age < 60) {
      initialScore += 10;
    } else if (age < 80) {
      initialScore += 5;
    } else {
      initialScore += 0;
    }

    if (financialSituation === 'good') {
      initialScore += 10;
    } else if (financialSituation === 'bad') {
      initialScore += 0;
    }

    if (loanAmount <= 100000) {
      initialScore += 20;
    } else if (loanAmount < 200000) {
      initialScore += 20;
    } else if (loanAmount < 300000) {
      initialScore += 10;
    } else {
      initialScore += 5;
    }

    if (loanDuration < 3) {
      initialScore += 20;
    } else if (loanDuration < 5) {
      initialScore += 10;
    } else {
      initialScore += 5;
    }

    if (loanPurpose === 'car') {
      initialScore += 10;
    } else if (loanPurpose === 'house') {
      initialScore += 5;
    } else if (loanPurpose === 'other') {
      initialScore += 0;
    }

    if (salary < 2000) {
      initialScore += 5;
    } else if (salary < 3000) {
      initialScore += 10;
    } else {
      initialScore += 20;
    }

    return initialScore;
  }

  async getClientData(clientId: string): Promise<Client> {
    return this.clientRepository.findOne(clientId);
  }
}
