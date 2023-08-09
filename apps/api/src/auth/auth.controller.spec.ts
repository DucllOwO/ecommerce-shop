import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '../Mailer/mailer.service';
import { AuthController } from './auth.controller';
import { LocalAuthGuard } from './guards/local-auth.guard';

describe('AuthController', () => {
  let controller: AuthController;

  const mockMailerService = {
    sendForgotPasswordEmail: jest.fn().mockImplementation(() => {})
  };

  const mockLocalAuthGuard = { 
      canActivate() {
      return true; // Allow the guard to pass during testing
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        MailService,
        { provide: LocalAuthGuard, useValue: mockLocalAuthGuard }
      ]
    }).overrideProvider(MailService).useValue(mockMailerService).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('forgot password',  () => {
    it('should return a token',async () => {
      const email = "nguyenduc14782@Gmail.com"
      expect(await controller.forgotPassword(email)).toEqual(expect.any(String))
      expect(mockMailerService.sendForgotPasswordEmail).toBeCalled();
    })
  })

  // describe('login', () => {
  //   it('should return a user with token', () => {
  //     const user = { email: '20520453@gmail.com', password: '123456'};
  //     const access_token = "";

  //     expect(controller.login(user)).toEqual({})
  //   })
  // })
});
