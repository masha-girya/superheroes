/* eslint-disable no-console */
import { useCallback, useState } from 'react';

export const useRequest = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendUniqueRequest = useCallback(
    // eslint-disable-next-line consistent-return
    async (callback: () => Promise<any>) => {
      try {
        setIsError(false);
        setIsLoading(true);

        return await callback();
      } catch (error) {
        console.error('error in request', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }, [],
  );

  return {
    sendUniqueRequest,
    isError,
    setIsError,
    isLoading,
    setIsLoading,
  };
};
