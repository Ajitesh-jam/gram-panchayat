import { updateCitizen } from '@/src/components/sql/mysql';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { aadhar, updates } = req.body;
    const updatedCitizen = await updateCitizen(aadhar, updates);
    res.status(200).json(updatedCitizen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating citizen' });
  }
}
