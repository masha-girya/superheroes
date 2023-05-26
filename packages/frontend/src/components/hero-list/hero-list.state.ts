/* eslint-disable padding-line-between-statements */
import { useCallback, useEffect, useState } from 'react';
import { ISuperhero } from '../../types';
import { useRequest } from '../../utils/hooks';
import { getSuperheroesPag } from '../../utils/api';

export const useHeroListState = () => {
  const [heroes, setHeroes] = useState<ISuperhero[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([1]);
  const { sendUniqueRequest, isError, isLoading } = useRequest();

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  const loadHeroes = useCallback(async () => {
    const response = await sendUniqueRequest(() => getSuperheroesPag(`${currentPage}`));

    if (response) {
      const pages = Array(Math.ceil(response.total / 5))
        .fill(0)
        .map((el, i) => i + 1);

      setHeroes(response.results);
      setTotalPages(pages);
    }
  }, [currentPage]);

  useEffect(() => {
    loadHeroes();
  }, [currentPage]);

  return {
    heroes,
    totalPages,
    isLoading,
    isError,
    handleChangePage,
  };
};
