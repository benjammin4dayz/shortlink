import cors from 'cors';
import express from 'express';
import path from 'path';
import serveStatic from 'serve-static';
import { errorHandler, httpRequestLogger } from './middleware';
import apiRouter from './routes/apiRouter';
import fallbackRouter from './routes/fallbackRouter';
import shortlinkRouter from './routes/shortlinkRouter';
import { PORT } from './utils/env.config';
import { httpLogger as logger } from './utils/logger';

const staticServer = serveStatic(path.join(__dirname, '../public'), {
  index: ['index.html'],
});

const app = express();

app.use(httpRequestLogger());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler());

app.use('/api', apiRouter);
app.use('/s', shortlinkRouter);
app.use(staticServer);
app.use(fallbackRouter);

app.listen(PORT, () => logger.info('Listening on port %d', PORT));
