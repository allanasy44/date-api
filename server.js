import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files (like HTML, CSS, and JS)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;
  
  let date;
  if (!dateParam) {
    date = new Date();
  } else {
    date = new Date(dateParam);
    if (isNaN(date.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
