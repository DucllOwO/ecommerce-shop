import { AccountService } from './../account/account.service';
import { PrismaModule } from './../prisma/prisma.module';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.stategy';
import { LocalStrategy } from './strategies/local.stategy';
import { AccountModule } from '../account/account.module';
import { PassportModule } from '@nestjs/passport';

describe('AuthService', () => {
  let service: AuthService;
  let accountService: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtStrategy, LocalStrategy],
      imports: [AccountModule, PassportModule, JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: "7d" },
      }), PrismaModule]
    }).compile();

    service = module.get<AuthService>(AuthService);
    accountService = module.get<AccountService>(AccountService);
  });

  it('should be return a jwt', async () => {
    const account = { email: 'test@admin.com', password: '123456' };

    const res = await accountService.create(account);

    expect(await service.validateUser(account)).toHaveProperty('access_token');
  });
});
