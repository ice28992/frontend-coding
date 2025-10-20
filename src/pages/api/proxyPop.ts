import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prefCode } = req.query;

  if (!prefCode || Array.isArray(prefCode)) {
    return res.status(400).json({ message: 'Invalid or missing prefCode' });
  }

  try {
    const response = await fetch(`https://frontend-engineer-codecheck-api.mirai.yumemi.io/api/v1/population/composition/perYear?prefCode=${prefCode}`, {
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY || '',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Failed to fetch data' });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
