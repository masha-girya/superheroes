import { ISuperhero } from './superhero.type';

export interface ISuperheroesResponse {
  results: ISuperhero[],
  page_total: number,
  total: number,
}
