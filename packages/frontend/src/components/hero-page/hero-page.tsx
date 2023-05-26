import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Loader } from '../loader';
import { useHeroPageState } from './hero-page.state';
import './hero-page.scss';
import { ROUTE_CONSTANTS } from '../../app-constants';
import { Delete } from '../delete';

export const HeroPage = () => {
  const {
    hero,
    facts,
    isLoading,
    isError,
    isOnDelete,
    navigateBack,
    handleOpenDelete,
  } = useHeroPageState();

  return (
    <main className="hero-page">
      {isLoading && !hero && <Loader />}

      {isError && !isLoading && <p>Error</p>}

      {isOnDelete && (
        <Delete
          heroNickname={hero?.nickname as string}
          handleOpenDelete={handleOpenDelete}
        />
      )}

      {hero && (
        <div className="hero-page__container">
          <button
            type="button"
            onClick={navigateBack}
            className="hero-page__back-link"
          >
            Go back
          </button>

          <div className="hero-page__images">
            {[hero.images].flat().map(image => (
              <img
                alt={hero.nickname}
                src={`data:image/png;base64,${image}`}
                className="hero-page__image"
              />
            ))}
          </div>

          <article>
            <div>
              {facts.map(key => (
                <div className="hero-page__facts" key={key}>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    component="h3"
                  >
                    {key}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.primary"
                    component="p"
                  >
                    {hero[key as keyof typeof hero]}
                  </Typography>
                </div>
              ))}
            </div>
          </article>

          <div className="hero-page__actions">
            <Link to={`${ROUTE_CONSTANTS.EDIT}/${hero.nickname}`}>
              <Button variant="contained">Edit</Button>
            </Link>

            <Button
              variant="outlined"
              color="error"
              onClick={handleOpenDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};
