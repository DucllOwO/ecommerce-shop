import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  public isNullorUndefined(value): boolean {
    return value === undefined || value === null;
  }
}
