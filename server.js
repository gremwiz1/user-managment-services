const express = require('express');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api', userRoutes);

const { PORT = 3002 } = process.env;
app.listen(port, () => {
  console.log(`User Service is running on port ${PORT}`);
});
