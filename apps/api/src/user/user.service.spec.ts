import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get user', () => {
    expect(service.user({id: "079202011909"})).toReturnWith({
      id: "079202011909",
      email: "kimdientruong1105@gmail.com",
      address: "657A/6 Ba Đình P9 Q8",
      avatar: "https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png?t=2023-03-27T06%3A57%3A15.196Z",
      firstname: "Kim Điền",
      lastname: "Trương",
      product_viewed: [],
      phone_number: "0703391661"
    })
  })
});
