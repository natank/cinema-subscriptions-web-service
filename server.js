import express from 'express';
import connectDB from './DB/Connection';
import moviesRouter from './Routes/movies';
import membersRouter from './Routes/members';
import subscriptionsRouter from './Routes/subscriptions';
const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use('/movies', moviesRouter);
app.use('/members', membersRouter);
app.use('/subscriptions', subscriptionsRouter);

const Port = process.env.Port || 3000;

app.listen(Port, () => console.log(`Server listening on port ${Port} `));
