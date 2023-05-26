import React from 'react';
import { Edit } from '../edit/edit';
import { useHeroEditState } from './hero-edit.state';
import './hero-edit.scss';

export const HeroEdit = () => {
  const { hero, navigateBack } = useHeroEditState();

  return (
    <div className="hero-edit">
      <button
        type="button"
        onClick={navigateBack}
        className="hero-edit__back-link"
      >
        Go to main
      </button>

      {hero && (
        <Edit hero={hero} />
      )}
    </div>
  );
};
