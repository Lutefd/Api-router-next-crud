import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useDynamicDataQuery(id: string) {
  const { isLoading, data } = useQuery(['dynamicQueryData'], async () => {
    const response = await axios.get(`http://localhost:3000/api/${id}/`);
    return response.data;
  });
  return { isLoading, data };
}
