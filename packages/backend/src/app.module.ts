import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperheroEntity, SuperheroModule } from './modules/superheroes';
import { DB_CONSTANTS as DB } from './constants';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: DB.HOST,
        username: DB.USERNAME,
        password: DB.PASSWORD,
        database: DB.NAME,
        entities: [SuperheroEntity],
        synchronize: true,
      }),
    }),
    SuperheroModule,
  ],
})
export class AppModule {}
