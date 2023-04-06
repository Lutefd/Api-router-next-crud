import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function useEditDataMutation(pid: string) {
  const queryClient = useQueryClient();
  const postURL = `http://localhost:3000/api/${pid}/`;

  const editDataMutation = useMutation(
    async (data: object) => {
      const response = await axios.put(postURL, {
        ...data,
      });
      return response.data;
    },

    {
      onSuccess: (data) => {
        console.log('Editado com sucesso', data);
        queryClient.invalidateQueries(['queryData']);
      },
      onError: (error) => {
        console.log('erro', error);
      },
    }
  );
  return { editDataMutation };
}
