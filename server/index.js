const express = require('express');
const cors = require('cors');
const { configDotenv } = require('dotenv');
const {connectDB} = require('./config/db');
configDotenv();
const userRoutes = require('./routes/user');
const goalRoutes = require('./routes/goal');
const auth = require('./middleware/auth');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connectDB();
});

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use('/auth', userRoutes);
app.use('/goals', auth, goalRoutes);
