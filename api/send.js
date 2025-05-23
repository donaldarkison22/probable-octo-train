export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { homegreen, homered } = req.body;

  if (!homegreen || !homered) {
    return res.status(400).json({ success: false, message: 'Missing input fields' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const text = `E(1st): ${homegreen}\nP0: ${homered}`;

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  });

  const data = await response.json();

  if (data.ok) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ success: false, message: data.description });
  }
}
