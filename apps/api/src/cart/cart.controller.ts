import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: Prisma.CartCreateInput) {
    return this.cartService.createCart(createCartDto);
  }

  @Get()
  findAllByUser(@Query('userID') userID: string) {
    return this.cartService.carts({
      where: {
        userID: {
          equals: Number(userID)
        }
      }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.cart({id: Number(id)});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: Prisma.CartCreateInput) {
    return this.cartService.updateCart({
      where: {id: Number(id)},
      data: updateCartDto
    }); 
  }

  @Delete(':id')
  delete(@Param('id') id: string){
    console.log(id)
    return this.cartService.deleteCart({
      where: {
        id: Number(id)
      }
    })
  }
}
