// pages/api/meetings.ts

import { NextApiRequest, NextApiResponse } from 'next';

const meetings = [
  { id: 1, title: "Team Meeting", date: "2024-06-04", time: "10:00 AM" },
  { id: 2, title: "Client Call", date: "2024-06-05", time: "2:00 PM" },
  // Add more meetings as needed
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(meetings);
}
