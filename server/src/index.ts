import express from 'express';
import dataRouter from './data/data.router';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use('/api', dataRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
