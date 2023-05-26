import { useCallback, useState } from 'react';
import { useRequest } from '../../utils/hooks';
import { removeSuperhero } from '../../utils/api';

interface IProps {
  heroNickname: string,
}

export const useDeleteState = ({ heroNickname }: IProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { sendUniqueRequest } = useRequest();

  const deleteHero = useCallback(async () => {
    const response = await sendUniqueRequest(() => (
      removeSuperhero(heroNickname)));

    if (response) {
      setIsSuccess(true);
    }
  }, []);

  return { isSuccess, deleteHero };
};
