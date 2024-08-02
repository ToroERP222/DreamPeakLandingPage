// pages/api/update-activities.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '../../utils/supabase/server-props';
import { GetServerSidePropsContext } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, activities } = req.body;

    try {
      const context = { req, res } as unknown as GetServerSidePropsContext; // Creating a fake context for the API route
      const supabase = createClient(context);

      const { error } = await supabase
        .from('profile')
        .update({ activities })
        .eq('userid', userId);

      if (error) throw error;

      res.status(200).json({ message: 'Activities updated successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
