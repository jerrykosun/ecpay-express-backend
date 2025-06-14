require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 根目錄測試用
app.get('/', (req, res) => {
  res.send('Square & Cube API is working!');
});

// 核心服務：計算平方與立方
app.post('/calc', (req, res) => {
  const { number } = req.body;

  if (typeof number !== 'number') {
    return res.status(400).json({ error: '請傳入數字' });
  }

  const square = number ** 2;
  const cube = number ** 3;

  res.json({ number, square, cube });
});

// 啟動服務
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
