import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseInterceptors,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SuperheroService, SuperheroDto } from '../superheroes';
import { ROUTE_CONSTANTS as ROUTE } from '../../constants';

@Controller(ROUTE.SUPERHEROES)
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Get()
  getSuperheroes() {
    return this.superheroService.get();
  }

  @Get(ROUTE.PAGINATION)
  getSuperheroesPagination(@Query('page') page: string) {
    return this.superheroService.getPagination(page);
  }

  @Get(ROUTE.NICKNAME)
  getSuperhero(@Param('nickname') nickname: string) {
    return this.superheroService.getOne(nickname);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  addSuperhero(
    @Body() superheroDto: SuperheroDto,
    @UploadedFiles() images: Express.Multer.File[] | Express.Multer.File,
  ) {
    return this.superheroService.add(superheroDto, images);
  }

  @Patch(ROUTE.ID)
  @UseInterceptors(FilesInterceptor('images'))
  updateSuperhero(
    @Param('id') id: string,
    @Body() updatedSuperheroDto: SuperheroDto,
    @UploadedFiles() images: Express.Multer.File[] | Express.Multer.File,
  ) {
    return this.superheroService.update(id, updatedSuperheroDto, images);
  }

  @Delete(ROUTE.NICKNAME)
  removeSuperhero(@Param('nickname') nickname: string) {
    return this.superheroService.remove(nickname);
  }
}
