import { app } from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

async function bootstrap() {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`[HTTP] listening on http://localhost:${env.PORT}`);
  });
}

bootstrap().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
