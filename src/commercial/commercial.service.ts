import { Injectable } from '@nestjs/common';
import { ClientInfo } from './Entity/ClientInfo';

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

  private performEligibilityCheck(client: ClientInfo, data: any): any {
    return true;
  }

  async getClientData(clientId: string): Promise<Client> {
    return this.clientRepository.findOne(clientId);
  }
}
