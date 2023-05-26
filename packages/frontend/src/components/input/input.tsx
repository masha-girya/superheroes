import React from 'react';
import TextField from '@mui/material/TextField';
import { useInput } from './input.state';
import './input.scss';

interface IProps {
  placeholder?: string,
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  helperText?: string | boolean,
  id?: string,
  name?: string,
  error?: boolean,
  isMultiline?: boolean,
  isMultiple?: boolean,
  handleMultiple?: (value: string) => void,
}

export const Input = (props: IProps) => {
  const {
    id,
    name,
    error,
    value,
    onChange,
    helperText,
    placeholder,
    isMultiline,
    isMultiple,
    handleMultiple,
  } = props;

  const {
    handleKeyDown,
    handleMultipleChange,
  } = useInput({ value, handleMultiple });

  return (
    <div className="Input Input__container">
      <TextField
        type="text"
        label={placeholder}
        variant="outlined"
        value={value}
        onChange={onChange}
        helperText={helperText}
        id={id}
        name={name}
        error={error}
        onKeyDown={handleKeyDown}
        multiline={isMultiline}
      />

      {isMultiple && (
        <button
          type="button"
          onClick={handleMultipleChange}
          className="Input__multiple-button"
        >
          +
        </button>
      )}
    </div>
  );
};
