import { Injectable, Logger, Scope } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from 'db_types';


@Injectable()
export class Supabase {
  private readonly logger = new Logger(Supabase.name);
  public clientInstance: SupabaseClient<Database>;

  constructor() {
    this.logger.log('getting supabase client...');
    this.clientInstance = createClient<Database>(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    );
    this.logger.log('supabase connected');
  }

  // getClient() {
  //   this.logger.log('getting supabase client...');
  //   if (this.clientInstance) {
  //     this.logger.log('client exists - returning for current Scope.REQUEST');
  //     return this.clientInstance;
  //   }

  //   this.logger.log('initialising new supabase client for new Scope.REQUEST');

  //   this.logger.log(process.env.SUPABASE_URL);
  //   this.clientInstance = createClient(
  //     process.env.SUPABASE_URL,
  //     process.env.SUPABASE_SERVICE_ROLE_KEY,
  //   );


  //   return this.clientInstance;
  // }
}
