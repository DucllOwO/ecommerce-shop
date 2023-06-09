import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name)
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.users({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.user({id: Number(id)});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.userService.updateUser({
      where: {id: Number(id)},
      data: updateUserDto
    });
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
