import fs from 'fs';
import { join } from 'path';

interface Data {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export function getData(): Data[] {
  const data = fs.readFileSync(join(__dirname, '../../db/example.json'), 'utf8');
  return JSON.parse(data);
}

export function addData(data: Omit<Data, 'id'>) {
  const dataFile = fs.readFileSync(join(__dirname, '../../db/example.json'), 'utf8');
  const parsedData: Data[] = JSON.parse(dataFile);
  const newData: Data = {
    id: parsedData.length + 1,
    name: data.name,
    email: data.email,
    avatar: '/' + data.avatar,
  };
  parsedData.push(newData);
  fs.writeFileSync(join(__dirname, '../../db/example.json'), JSON.stringify(parsedData));
}

export function deleteData(id: number) {
  const data = fs.readFileSync(join(__dirname, '../../db/example.json'), 'utf8');
  const parsedData: Data[] = JSON.parse(data);
  const newData = parsedData.filter((item) => item.id !== id);
  fs.writeFileSync(join(__dirname, '../../db/example.json'), JSON.stringify(newData));
}
export const dataService = {};
