import type { NextApiRequest, NextApiResponse } from 'next';
import FileSystem from 'fs';
import { v4 as uuidv4 } from 'uuid';

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
  switch (method) {
    case 'POST':
      FileSystem.readFile('test.json', (err, data) => {
        const { name, age } = req.body;
        if (!name || !age) {
          res.status(400).json({ error: 'Name and age are required fields' });
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
          FileSystem.writeFile('test.json', updatedDataString, (err) => {
            if (err) {
              console.log(err);
              res.status(500).json({
                error: 'An error occurred while appending data to the file',
              });
              return;
            }
            console.log('Data appended to file successfully');
            res.status(200).json(response);
          });
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .json({ error: 'An error occurred while parsing the JSON data' });
        }
      });
      break;
    case 'GET':
      FileSystem.readFile('test.json', (err, data) => {
        try {
          const dataString = data.toString();
          const jsonData = JSON.parse(dataString);
          res.status(200).json(jsonData);
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .json({ error: 'An error occurred while parsing the JSON data' });
        }
      });
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
