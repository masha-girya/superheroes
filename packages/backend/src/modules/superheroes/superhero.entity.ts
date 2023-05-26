import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dish')
export class SuperheroEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying')
  nickname: string;

  @Column('character varying')
  real_name: string;

  @Column('character varying')
  origin_description: string;

  @Column('character varying', { default: '' })
  superpowers: string;

  @Column('character varying')
  catch_phrase: string;

  @Column('character varying', {
    array: true,
  })
  images: string[] | string;
}
