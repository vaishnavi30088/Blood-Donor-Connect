const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createUserTable } = require('./models/User');
const { createDonorTable } = require('./models/Donor');
const authRoutes = require('./routes/authRoutes');
const donorRoutes = require('./routes/donorRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await createUserTable();
  await createDonorTable();
});
