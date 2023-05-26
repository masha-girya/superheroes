import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperheroEntity } from './superhero.entity';
import { SuperheroDto } from './superhero.dto';
import { ERROR_CONSTANTS as ERROR } from '../../constants';
import { cutDescription, imagesToString } from './superhero.helper';
import { Pagination } from '../../pagination';

@Injectable()
export class SuperheroService {
  constructor(
    @InjectRepository(SuperheroEntity)
    private superheroRepository: Repository<SuperheroEntity>,
  ) {}

  async get() {
    const superheroes = await this.superheroRepository.find();

    return superheroes;
  }

  async getPagination(page: string) {
    const [results, total] = await this.superheroRepository.findAndCount({
      take: 5,
      skip: Number(page || '1') * 5 - 5,
      order: {
        nickname: 'ASC',
      }
    });

    const updatedResults = results.map(res => ({ ...res, origin_description: cutDescription(res.origin_description)}))

    return new Pagination<SuperheroDto>({
      results: updatedResults,
      total,
    });
  }

  async getOne(nickname: string) {
    const superhero = await this.superheroRepository.findOneBy({ nickname });

    if (!superhero) {
      throw new NotFoundException(ERROR.SUPERHERO_NOT_EXISTS);
    }

    return superhero;
  }

  async add(
    createdSuperheroDto: SuperheroDto,
    images?: Express.Multer.File[] | Express.Multer.File,
  ) {
    const { nickname } = createdSuperheroDto;

    const superhero = await this.superheroRepository.findOneBy({ nickname });

    if (superhero) {
      throw new BadRequestException(ERROR.SUPERHERO_EXISTS);
    }

    const createdSuperhero = new SuperheroEntity();
    Object.assign(createdSuperhero, createdSuperheroDto);

    createdSuperhero.images = imagesToString(images);

    await this.superheroRepository.save(createdSuperhero);

    return createdSuperhero;
  }

  async update(
    id: string,
    updatedSuperheroDto: SuperheroDto,
    images: Express.Multer.File[] | Express.Multer.File,
  ) {
    const superhero = await this.superheroRepository.findOneBy({ id });

    if (!superhero) {
      return new NotFoundException(ERROR.SUPERHERO_NOT_EXISTS);
    }

    Object.assign(superhero, updatedSuperheroDto);

    if (Array.isArray(images) && images.length > 0) {
      superhero.images = imagesToString(images);
    }

    await this.superheroRepository.save(superhero);

    return superhero;
  }

  async remove(nickname: string) {
    await this.getOne(nickname);

    await this.superheroRepository.delete({ nickname });
  }
}
