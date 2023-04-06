import type { NextApiRequest, NextApiResponse } from 'next';
import FileSystem from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

type Data = {
  id?: string;
  name?: string;
  error?: string;
};

type ResponseData = {
  id: string;
  name: string;
  age: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  const jsonDirectory = path.join(process.cwd(), 'json');

  switch (method) {
    case 'POST':
      FileSystem.readFile(jsonDirectory + '/test.json', (err, data) => {
        const { name, age } = req.body;
        if (!name || !age) {
          res.status(400).json({ error: 'Name e Age são campos obrigatórios' });
          return;
        }
        const id = uuidv4();

        const response: ResponseData = { id, name, age };
        try {
          const dataString = data.toString();
          const jsonData = JSON.parse(dataString);
          const newData = { id, name, age };
          jsonData.push(newData);
          const updatedDataString = JSON.stringify(jsonData);
          FileSystem.writeFile(
            jsonDirectory + '/test.json',
            updatedDataString,
            (err) => {
              if (err) {
                console.log(err);
                res.status(500).json({
                  error: 'Um erro ocorreu ao adicionar os dados ao arquivo',
                });
                return;
              }
              console.log('Dados adicionados com sucesso!');
              res.status(200).json(response);
            }
          );
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .json({ error: 'Um erro ocorreu ao realizar o parsing do JSON' });
        }
      });
      break;
    case 'GET':
      FileSystem.readFile(jsonDirectory + '/test.json', (err, data) => {
        try {
          const dataString = data.toString();
          const jsonData = JSON.parse(dataString);
          res.status(200).json(jsonData);
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .json({ error: 'Um erro ocorreu ao realizar o parsing do JSON' });
        }
      });
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Metodo ${method} Não Permitido`);
  }
}
