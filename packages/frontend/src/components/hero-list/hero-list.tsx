import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import { useHeroListState } from './hero-list.state';
import { HeroItem } from '../hero-item';
import './hero-list.scss';
import { Loader } from '../loader';
import { ROUTE_CONSTANTS } from '../../app-constants';

export const HeroList = () => {
  const {
    heroes,
    totalPages,
    isLoading,
    isError,
    handleChangePage,
  } = useHeroListState();

  return (
    <main className="hero-list">
      <section className="hero-list__container">
        {(isLoading && heroes.length === 0) && <Loader />}

        {(isError && !heroes.length && !isLoading) && <p>Error</p>}

        {heroes.length > 0 && heroes.map(hero => (
          <HeroItem key={hero.id} hero={hero} />
        ))}
      </section>

      {heroes.length > 0 && (
        <>
          <nav className="hero-list__pages">
            <Pagination
              count={totalPages.length}
              shape="rounded"
              onChange={handleChangePage}
            />
          </nav>

          <Link to={ROUTE_CONSTANTS.ADD}>
            <Button variant="contained">Add a hero</Button>
          </Link>
        </>
      )}
    </main>
  );
};
