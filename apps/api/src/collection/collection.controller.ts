import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Prisma } from '@prisma/client';


@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionDto: Prisma.CollectionCreateInput) {
    return this.collectionService.updateCollection({
      where: {id: Number(id)},
      data: updateCollectionDto
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionService.removeCollection({id: Number(id)});
  }
}
