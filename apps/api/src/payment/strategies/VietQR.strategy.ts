import { Logger } from '@nestjs/common';
import axios from 'axios';

export class VietQRStrategy {
  private readonly logger = new Logger(VietQRStrategy.name);
  private readonly accountNo = '070104969303';
  private readonly accountName = 'NGUYEN TRI DUC';
  private readonly acqId = '970403';
  private readonly format = 'text';
  private readonly template = 'print';
  private readonly clientID = '1053e5be-34ae-4edc-b0f0-cf64e1ea53b0';
  private readonly apiKey = '719b1036-1ea2-4e00-bd45-0d36e010584f';
  private readonly apiUrl = 'https://api.vietqr.io/v2/generate';

  public async createQR(message: string, amount: number) {
    const requestData = {
      accountNo: this.accountNo,
      accountName: this.accountName,
      acqId: this.acqId,
      addInfo: message,
      amount: amount,
      template: this.template,
      format: this.format,
    };

    const qrRespond = await axios.post(this.apiUrl, requestData, {
      headers: {
        'x-client-id': this.clientID,
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    //this.logger.log(qrRespond);

    return qrRespond.data;
  }
}
