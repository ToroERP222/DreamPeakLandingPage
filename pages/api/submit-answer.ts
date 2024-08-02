// pages/api/submit-answers.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { answers } = req.body;
    
    // Handle the submitted answers, e.g., save to a database
    console.log('Received answers:', answers);

    res.status(200).json({ message: 'Answers submitted successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
