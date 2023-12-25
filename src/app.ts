import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';

// middleware
app.use(express.json());
app.use(cors());

// application route
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// global error handling
app.use(globalErrorHandler);

// Api not found handling
app.use(notFound);

export default app;
