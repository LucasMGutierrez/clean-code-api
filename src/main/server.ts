import { getMongoHelper } from '../infra/db/mongodb/helpers/mongo-helper';
import app from './config/app';
import env from './config/env';

getMongoHelper(env.mongoUrl)
  .then(() => {
    // eslint-disable-next-line no-console
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));
  })
  // eslint-disable-next-line no-console
  .catch(console.error);
