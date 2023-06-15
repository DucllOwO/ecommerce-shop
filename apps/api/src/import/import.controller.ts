import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ImportService } from './import.service';
import { Prisma } from '@prisma/client';

@Controller('import')
export class ImportController {
  constructor(private readonly orderService: ImportService) {}

  @Post()
  create(@Body() createOrderDto: Prisma.OrderCreateInput) {
    return this.orderService.createImporting(createOrderDto);
  }

  @Get()
  findAllWaiting() {
    return this.orderService.importings({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // throw new BadRequestException();
    return this.orderService.importing({id: Number(id)});
  }
}
