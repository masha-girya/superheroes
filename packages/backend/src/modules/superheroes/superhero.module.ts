import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  SuperheroEntity,
  SuperheroService,
  SuperheroController,
} from '../superheroes';

@Module({
  imports: [TypeOrmModule.forFeature([SuperheroEntity])],
  providers: [SuperheroService],
  controllers: [SuperheroController],
})
export class SuperheroModule {}
