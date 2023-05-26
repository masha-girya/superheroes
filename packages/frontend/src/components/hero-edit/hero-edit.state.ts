import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHero } from '../../utils/hooks';
import { ROUTE_CONSTANTS as ROUTE } from '../../app-constants';

export const useHeroEditState = () => {
  const { hero, isLoading, isError } = useHero();
  const navigate = useNavigate();

  const navigateBack = useCallback(() => {
    navigate(ROUTE.MAIN_PAGE);
  }, []);

  return {
    hero, isLoading, isError, navigateBack,
  };
};
