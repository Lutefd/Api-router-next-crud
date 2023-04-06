import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function useDeleteMutation(id: string) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    async () => {
      const response = await axios.delete(`http://localhost:3000/api/${id}/`);
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
}
