import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHero } from '../../utils/hooks';

export const useHeroPageState = () => {
  const {
    hero, isLoading, isError, facts,
  } = useHero();
  const navigate = useNavigate();
  const [isOnDelete, setIsOnDelete] = useState(false);

  const navigateBack = useCallback(() => {
    navigate(-1);
  }, []);

  const handleOpenDelete = () => {
    setIsOnDelete(!isOnDelete);
  };

  return {
    hero,
    facts,
    isLoading,
    isError,
    isOnDelete,
    navigateBack,
    handleOpenDelete,
  };
};
