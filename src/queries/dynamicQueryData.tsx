import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useDynamicDataQuery(id: string) {
  const { isLoading, data } = useQuery(['dynamicQueryData'], async () => {
    const response = await axios.get(
      `https://api-route-test-rho.vercel.app/api/${id}/`
    );
    return response.data;
  });
  return { isLoading, data };
}
