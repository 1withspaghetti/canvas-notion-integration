import 'dotenv/config'
import cron from 'node-cron';
import sync from './sync.ts';

const CRON_EXPRESSION = "0 * * * *" // Every hour


cron.schedule(CRON_EXPRESSION, async (context) => {

  console.log();
  console.log('========== Executing task at ' + context.dateLocalIso + ' ==========');
  console.log();
  await sync(context);
  console.log();

}, {
    timezone: "America/Los_Angeles",
});

console.log("Started cron job. ("+CRON_EXPRESSION+")");
