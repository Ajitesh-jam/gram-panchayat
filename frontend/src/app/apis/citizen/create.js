import { createCitizen } from '@/src/components/sql/mysql';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const citizen = req.body;
    const newCitizen = await createCitizen(citizen);
    res.status(201).json(newCitizen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating citizen' });
  }
}
