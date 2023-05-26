interface IProps {
  value: string,
  handleMultiple?: (value: string) => void,
}

export const useInput = ({ value, handleMultiple }: IProps) => {
  // eslint-disable-next-line consistent-return
  const handleMultipleChange = () => {
    if (handleMultiple) {
      return handleMultiple(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && handleMultiple) {
      handleMultiple(value);
    }
  };

  return {
    handleKeyDown,
    handleMultipleChange,
  };
};
