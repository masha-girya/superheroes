import axios, { AxiosResponse } from 'axios';
import { API_CONSTANTS as API } from '../../app-constants';
import { ISuperheroesResponse } from '../../types/superheroes-res.type';
import { ISuperhero } from '../../types';

export const getSuperheroesPag = async (page: string) => {
  const response: AxiosResponse<ISuperheroesResponse>
    = await axios.get(`${API.BASE_URL}${API.SUPERHEROES_PAG}${API.PAGE}${page}`);

  return response.data;
};

export const getSuperhero = async (nickname: string) => {
  const response: AxiosResponse<ISuperhero>
    = await axios.get(`${API.BASE_URL}/${nickname}`);

  return response.data;
};

export const updateSuperhero = async (
  id: string,
  data: FormData,
) => {
  const response: AxiosResponse<ISuperhero>
    = await axios.patch(
      `${API.BASE_URL}/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

  return response.data;
};

export const addSuperhero = async (data: FormData) => {
  const response: AxiosResponse<ISuperhero>
    = await axios.post(
      API.BASE_URL,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

  return response.data;
};

export const removeSuperhero = async (nickname: string) => {
  await axios.delete(`${API.BASE_URL}/${nickname}`);

  return true;
};
