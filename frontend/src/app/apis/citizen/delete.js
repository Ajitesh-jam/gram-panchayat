import { deleteCitizen } from '@/src/components/sql/mysql';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { aadhar } = req.body;
    const deletedCitizen = await deleteCitizen(aadhar);
    res.status(200).json(deletedCitizen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting citizen' });
  }
}
