import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useDeleteMutation = (id: string) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    async () => {
      const response = await axios.delete(
        `https://api-route-test-rho.vercel.app/api/${id}/`
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['queryData']);
        console.log('Deletado com sucesso');
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  return { deleteMutation };
};

export default useDeleteMutation;
