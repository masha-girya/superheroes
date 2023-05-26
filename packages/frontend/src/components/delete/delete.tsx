import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDeleteState } from './delete.state';
import { ROUTE_CONSTANTS } from '../../app-constants';
import './delete.scss';

interface IProps {
  heroNickname: string,
  handleOpenDelete: () => void,
}

export const Delete = ({ heroNickname, handleOpenDelete }: IProps) => {
  const {
    isSuccess,
    deleteHero,
  } = useDeleteState({ heroNickname });

  return (
    <div className="delete-hero">

      {isSuccess
        ? (
          <div className="delete-hero__box">
            <p>Success!</p>

            <Link to={ROUTE_CONSTANTS.MAIN_PAGE}>
              <Button
                variant="contained"
              >
                Go to main page
              </Button>
            </Link>
          </div>
        )
        : (
          <div className="delete-hero__box">
            <p>Are you sure you want to delete this hero?</p>

            <div className="delete-hero__actions">
              <Button
                variant="outlined"
                color="error"
                onClick={deleteHero}
              >
                Delete
              </Button>

              <Button
                variant="contained"
                onClick={handleOpenDelete}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
    </div>
  );
};
