import * as fs from 'fs';
import * as fastCsv from 'fast-csv';

export async function writeToCsv(data: any[], filename: string): Promise<void> {
  const ws = fs.createWriteStream(filename);

  return new Promise((resolve, reject) => {
    fastCsv
      .write(data, { headers: true })
      .pipe(ws)
      .on('finish', () => resolve())
      .on('error', (error) => reject(error));
  });
}
