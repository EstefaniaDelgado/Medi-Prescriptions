import { useLayoutEffect, useState } from 'react';

export const useDateFormat = () => {
  const [isClient, setIsClient] = useState(false);

  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  const formatDate = (dateString: string) => {
    if (!isClient) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (dateString: string) => {
    if (!isClient) return '';
    return new Date(dateString).toLocaleTimeString();
  };

  return { formatDate, formatTime, isClient };
};