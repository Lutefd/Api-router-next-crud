import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function useCreateDataMutation() {
  const queryClient = useQueryClient();
  const postURL = 'https://api-route-test-rho.vercel.app/api/user/';

  const createDataMutation = useMutation(
    async (data: object) => {
      const response = await axios.post(postURL, {
        ...data,
      });
      return response.data;
    },

    {
      onSuccess: (data) => {
        console.log('Criado com sucesso', data);
        queryClient.invalidateQueries(['queryData']);
      },
      onError: (error) => {
        console.log('erro', error);
      },
    }
  );
  return { createDataMutation };
}
