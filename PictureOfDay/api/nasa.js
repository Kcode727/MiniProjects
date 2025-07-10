export default async function handler(req, res) {
  const { date } = req.query;
  const apiKey = process.env.NASA_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'NASA API key is missing in environment variables.' });
  }

  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching NASA data:", err);
    res.status(500).json({ error: 'Failed to fetch data from NASA API.' });
  }
}
