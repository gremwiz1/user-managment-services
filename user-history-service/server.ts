import express from 'express';
import historyRoutes from './src/routes/historyRoutes';

const app = express();
app.use(express.json());

app.use('/api', historyRoutes);


const port = 3001;
app.listen(port, () => {
  console.log(`User History Service is running on port ${port}`);
});
