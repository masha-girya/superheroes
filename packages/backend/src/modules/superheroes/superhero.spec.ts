import { SuperheroService } from './superhero.service';
import { SuperheroController } from './superhero.controller';
import { DeleteResult, Repository } from 'typeorm';
import { SuperheroEntity } from './superhero.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('Superhero service', () => {
  let superheroService;
  let superheroRepository;
  let superheroController;

  const mockSuperheroes = [
    { id: 1, nickname: 'Superhero 1' },
    { id: 2, nickname: 'Superhero 2' },
    { id: 3, nickname: 'Superhero 3' },
    { id: 4, nickname: 'Superhero 4' },
    { id: 5, nickname: 'Superhero 5' },
    { id: 6, nickname: 'Superhero 6' },
    { id: 7, nickname: 'Superhero 7' },
  ];

  const createdSuperheroDto = {
    nickname: 'Superman',
    real_name: 'John Doe',
    origin_description: 'Test superhero',
    superpowers: 'power1',
    catch_phrase: 'Some phrase',
    images: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperheroService,
        {
          provide: getRepositoryToken(SuperheroEntity),
          useClass: Repository,
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
      controllers: [SuperheroController],
    }).compile();

    superheroController = module.get<SuperheroController>(SuperheroController);
    superheroService = module.get<SuperheroService>(SuperheroService);
    superheroRepository = module.get<Repository<SuperheroEntity>>(
      getRepositoryToken(SuperheroEntity),
    );
  });

  it('should return an array of superheroes', async () => {
    superheroRepository.find = jest.fn().mockResolvedValue(mockSuperheroes);

    const result = await superheroController.getSuperheroes();

    expect(result).toEqual(mockSuperheroes);
  });

  it('should return last two superheroes if their length 7 and page 2', async () => {
    const mockedResult = mockSuperheroes.slice(5);

    jest
      .spyOn(superheroRepository, 'findAndCount')
      .mockResolvedValueOnce([mockedResult, 2]);

    const result = await superheroController.getSuperheroesPagination('2');

    expect(result.results).toEqual(mockedResult);
    expect(result.page_total).toEqual(2);
    expect(result.results[0]).toEqual(mockedResult[0]);
    expect(result.results.length).toEqual(2);
  });

  it('should return first 5 superheroes', async () => {
    const mockedResult = mockSuperheroes.slice(0, 5);

    jest
      .spyOn(superheroRepository, 'findAndCount')
      .mockResolvedValueOnce([mockedResult, 5]);

    const result = await superheroController.getSuperheroesPagination('1');

    expect(result.results).toEqual(mockedResult);
    expect(result.page_total).toEqual(5);
    expect(result.results[0]).toEqual(mockedResult[0]);
    expect(result.results.length).toEqual(5);
  });

  it('should return first 5 superheroes if there is no page in query', async () => {
    const mockedResult = mockSuperheroes.slice(0, 5);

    jest
      .spyOn(superheroRepository, 'findAndCount')
      .mockResolvedValueOnce([mockedResult, 5]);

    const result = await superheroController.getSuperheroesPagination();

    expect(result.results).toEqual(mockedResult);
    expect(result.page_total).toEqual(5);
    expect(result.results[0]).toEqual(mockedResult[0]);
    expect(result.results.length).toEqual(5);
  });

  it('should add superhero', async () => {
    const createdSuperheroDto = {
      nickname: 'Superman',
      real_name: 'John Doe',
      origin_description: 'Test superhero',
      superpowers: 'power1',
      catch_phrase: 'Some phrase',
      images: [],
    };

    superheroRepository.findOneBy = jest.fn().mockResolvedValue(null);

    const createdSuperheroEntity = new SuperheroEntity();
    Object.assign(createdSuperheroEntity, createdSuperheroDto);

    superheroRepository.save = jest
      .fn()
      .mockResolvedValue(createdSuperheroEntity);

    const result = await superheroController.addSuperhero(
      createdSuperheroDto,
      [],
    );

    expect(result).toEqual(createdSuperheroEntity);
    expect(superheroRepository.findOneBy).toHaveBeenCalledWith({
      nickname: 'Superman',
    });
    expect(superheroRepository.save).toHaveBeenCalledWith(
      createdSuperheroEntity,
    );
  });

  it('should not add superhero if nickname is already exists', async () => {
    const createdSuperhero = {
      ...createdSuperheroDto,
      nickname: 'Superhero 1',
    };

    const createdSuperheroEntity = new SuperheroEntity();
    Object.assign(createdSuperheroEntity, createdSuperhero);

    superheroRepository.findOneBy = jest
      .fn()
      .mockResolvedValue(
        mockSuperheroes.find(
          (hero) => hero.nickname === createdSuperhero.nickname,
        ),
      );

    superheroRepository.save = jest
      .fn()
      .mockResolvedValue(createdSuperheroEntity);

    await expect(
      superheroController.addSuperhero(createdSuperhero, []),
    ).rejects.toThrow(BadRequestException);
    expect(superheroRepository.findOneBy).toHaveBeenCalledWith({
      nickname: 'Superhero 1',
    });
    expect(superheroRepository.save).not.toHaveBeenCalled();
  });

  it('should update superhero', async () => {
    console.log('START', mockSuperheroes);

    const existedHero = { id: 1, nickname: 'Superhero 1' };

    superheroRepository.findOneBy = jest.fn().mockResolvedValue(existedHero);

    Object.assign(existedHero, { nickname: createdSuperheroDto.nickname });

    superheroRepository.save = jest.fn().mockResolvedValue(existedHero);

    const result = await superheroController.updateSuperhero(
      existedHero.nickname,
      createdSuperheroDto,
      [],
    );

    expect(result).toEqual(existedHero);
    expect(result.nickname).toEqual(createdSuperheroDto.nickname);
    expect(superheroRepository.save).toHaveBeenCalledWith(existedHero);
  });

  it('should delete superhero', async () => {
    const nickname = 'Superhero 7';
    let deleteResult: DeleteResult;

    superheroRepository.findOneBy = jest
      .fn()
      .mockResolvedValue(
        mockSuperheroes.find((hero) => hero.nickname === nickname),
      );

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(superheroService, 'remove').mockResolvedValueOnce(() => {});

    jest
      .spyOn(superheroRepository, 'delete')
      .mockResolvedValueOnce(deleteResult);

    await superheroController.removeSuperhero(nickname);

    expect(superheroService.remove).toHaveBeenCalledWith(nickname);
  });

  it('should throw NotFoundException if the superhero does not exist', async () => {
    const nickname = 'Superman 2';

    superheroRepository.findOneBy = jest
      .fn()
      .mockRejectedValue(new NotFoundException());

    jest.spyOn(superheroRepository, 'remove').mockResolvedValueOnce(undefined);

    await expect(superheroController.removeSuperhero(nickname)).rejects.toThrow(
      NotFoundException,
    );
    expect(superheroRepository.remove).not.toHaveBeenCalled();
  });
});
