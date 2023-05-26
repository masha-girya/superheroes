import { useState, useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ISuperhero } from '../../types';
import { useRequest } from './api.hook';
import { getSuperhero } from '../api';

export const useHero = () => {
  const { pathname } = useLocation();

  const mockedHero: ISuperhero = {
    id: '',
    nickname: '',
    real_name: '',
    catch_phrase: '',
    superpowers: '',
    origin_description: '',
    images: '',
  };

  const [hero, setHero] = useState <ISuperhero | null>(null);
  const [facts, setFacts] = useState<string[]>([]);
  const { sendUniqueRequest, isLoading, isError } = useRequest();
  const { nickname } = useParams();

  const loadHero = useCallback(async () => {
    if (nickname) {
      const response: ISuperhero = await sendUniqueRequest(() => (
        getSuperhero(nickname)));

      const heroFacts = Object.keys(response)
        .filter(key => key !== 'images' && key !== 'id');

      setHero(response);
      setFacts(heroFacts);
    }
  }, [nickname]);

  useEffect(() => {
    if (pathname.includes('/add')) {
      setHero(mockedHero);
    } else {
      loadHero();
    }
  }, []);

  return {
    hero, isLoading, isError, facts,
  };
};
