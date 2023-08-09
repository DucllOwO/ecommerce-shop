import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Prisma } from '@prisma/client';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';


@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createCollectionDto: Prisma.CollectionCreateInput) {
    return this.collectionService.createCollection(createCollectionDto);
  }

  @Get()
  findAll() {
    return this.collectionService.collections({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionService.collection({id: Number(id)});
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionDto: Prisma.CollectionCreateInput) {
    return this.collectionService.updateCollection({
      where: {id: Number(id)},
      data: updateCollectionDto
    });
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionService.removeCollection({id: Number(id)});
  }
}
