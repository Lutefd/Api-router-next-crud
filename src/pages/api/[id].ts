import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import FileSystem from 'fs';
import path from 'path';

interface Data {
  id?: string;
  name?: string;
  age?: number;
  error?: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { message: string }>
) {
  const {
    query: { id },
    method,
  } = req;

  try {
    const jsonDirectory = path.join(process.cwd(), 'json');

    const fileContent = await fs.readFile(
      jsonDirectory + '/test.json',
      'utf-8'
    );
    const data: Data[] = JSON.parse(fileContent);

    switch (method) {
      case 'GET':
        FileSystem.readFile(jsonDirectory + '/test.json', (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }

          try {
            const jsonData: Data[] = JSON.parse(data.toString());
            const item = jsonData.find((item) => item.id === id);
            if (!item) {
              res.status(404).json({ error: 'Usuário não encontrado' });
              return;
            }
            res.status(200).json(item);
          } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
          }
        });
        break;
      case 'DELETE':
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
          res.status(404).json({ message: 'Usuário não encontrado' });
          return;
        }
        const deletedItem = data.splice(index, 1)[0];
        await fs.writeFile(
          jsonDirectory + '/test.json',
          JSON.stringify(data),
          'utf-8'
        );
        res.status(200).json(deletedItem);
        break;
      case 'PUT':
        const { id } = req.query;
        const { name, age } = req.body;
        if (!name || !age) {
          res.status(400).json({ error: 'Name e Age são campos obrigatorios' });
          return;
        }
        FileSystem.readFile(jsonDirectory + '/test.json', (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          try {
            const dataString = data.toString();
            const jsonData = JSON.parse(dataString);

            const itemIndex = jsonData.findIndex((item: any) => item.id === id);
            if (itemIndex === -1) {
              res.status(404).json({ error: 'Item not found' });
              return;
            }

            const updatedItem = { ...jsonData[itemIndex], name, age };
            jsonData[itemIndex] = updatedItem;

            const updatedDataString = JSON.stringify(jsonData);

            FileSystem.writeFile(
              jsonDirectory + '/test.json',
              updatedDataString,
              (err) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({ error: 'Internal server error' });
                  return;
                }
                console.log('Usuário atualizado com sucesso!');
                res.status(200).json(updatedItem);
              }
            );
          } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
          }
        });
        break;

      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end(`Metodo ${method} Não Permitido`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
