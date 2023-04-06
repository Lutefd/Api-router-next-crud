import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useDataQuery() {
  const { isLoading, data } = useQuery(
    ['queryData'],
    async () => {
      const response = await axios.get(
        'https://api-route-test-rho.vercel.app/api/user/'
      );
      return response.data;
    },

    {
      staleTime: 1000 * 60,
    }
  );
  return { isLoading, data };
}
