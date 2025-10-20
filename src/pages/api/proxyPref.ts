import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://frontend-engineer-codecheck-api.mirai.yumemi.io/api/v1/prefectures', {
      headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY || '' },
    });

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Failed to fetch data' });
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: error });
  }
}
