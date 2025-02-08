import { getCitizenByAadhar } from '@/src/components/sql/mysql';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { aadhar } = req.query;
    const citizen = await getCitizenByAadhar(aadhar);
    if (!citizen) return res.status(404).json({ error: 'Citizen not found' });

    res.status(200).json(citizen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching citizen' });
  }
}
