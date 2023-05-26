import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Input } from '../input';
import { useEditState } from './edit.state';
import { ISuperhero } from '../../types';
import './edit.scss';

interface IProps {
  hero: ISuperhero,
}

export const Edit = ({ hero }: IProps) => {
  const {
    error,
    formik,
    isError,
    isSuccess,
    handleImageUpload,
    handleDeleteImage,
  } = useEditState({ hero });
  const { nickname } = hero;

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
  } = formik;

  return (
    <div className="edit">
      <Typography
        variant="h3"
        color="text.primary"
        component="h3"
      >
        {`Edit ${nickname}`}
      </Typography>

      <form className="edit__form" onSubmit={handleSubmit}>
        <div className="edit__form-container">
          <div className="edit__info">
            <Input
              placeholder="Nickname"
              value={values.nickname}
              onChange={handleChange}
              helperText={errors.nickname}
              id="nickname"
              name="nickname"
            />

            <Input
              placeholder="Real name"
              value={values.real_name}
              onChange={handleChange}
              helperText={errors.real_name}
              id="real_name"
              name="real_name"
            />

            <Input
              placeholder="Catch phrase"
              value={values.catch_phrase}
              onChange={handleChange}
              helperText={errors.catch_phrase}
              id="catch_phrase"
              name="catch_phrase"
            />

            <Input
              placeholder="Superpowers"
              value={values.superpowers}
              onChange={handleChange}
              helperText={errors.superpowers}
              id="superpowers"
              name="superpowers"
            />

            <Input
              placeholder="Description"
              value={values.origin_description}
              onChange={handleChange}
              id="origin_description"
              name="origin_description"
              isMultiline
            />
          </div>

          <div className="edit__images">
            <div className="edit__images-box">
              {values.images.map((img, i) => (
                <div key={img} className="edit__remove-box">
                  <button
                    className="edit__remove-img"
                    type="button"
                    onClick={() => handleDeleteImage(i)}
                  >
                    x
                  </button>

                  <img
                    className="edit__images-img"
                    src={img}
                    alt=""
                  />
                </div>
              ))}
            </div>

            <label className="edit__images-button">
              Change
              <input
                type="file"
                className="edit-image__input"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        <div className="edit__submit">
          {error.length > 0 && (
            <Typography
              variant="body1"
              color="text.error"
            >
              {error}
            </Typography>
          )}

          {isError && (
            <Typography
              variant="body1"
              color="text.error"
            >
              Request error
            </Typography>
          )}

          <Button type="submit" variant="contained">Submit</Button>

          {isSuccess && (
            <Typography
              variant="h5"
              color="text.primary"
            >
              Request succeded!
            </Typography>
          )}
        </div>
      </form>
    </div>
  );
};
