import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);


  async getHello(): Promise<any> {
    // const { data: user, error: userError } = await this.supabase.clientInstance
    //   .from(`account`)
    //   .select(`*, roomtype:room_type_id(*)`);

    // const { data, error } = await this.supabase.clientInstance
    //   .from(`room`)
    //   .select(`*, room_type_id(*)`);

    // this.logger.log(data[0]);

    // if (error) {
    //   throw new InternalServerErrorException(error.message);
    // }

    // return user[0];
  }
}
