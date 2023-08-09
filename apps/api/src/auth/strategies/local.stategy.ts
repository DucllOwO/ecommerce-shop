import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from 'src/account/account.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log(
      '🚀 ~ file: local.stategy.ts:28 ~ LocalStrategy ~ validate ~ email:',
      email,
    );
    const account = await this.accountService.findOne({ email: email });
    console.log(
      '🚀 ~ file: local.stategy.ts:30 ~ LocalStrategy ~ validate ~ account:',
      account,
    );

    if (!account) {
      throw new NotFoundException();
    }

    // hash login userdto password
    const isMatch = await bcrypt.compare(password, account.password);

    // if true return access_token, false return UnauthorizedException
    if (!isMatch) throw new UnauthorizedException();

    //get user information to create payload
    const { password: removedPassword, User, ...accountRemaining } = account;

    return {
      access_token: this.jwtService.sign(accountRemaining),
      user: { ...User[0], ...accountRemaining },
    };
  }
}
