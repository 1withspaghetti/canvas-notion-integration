import 'dotenv/config'
import sync from "./sync.ts";

// Run the sync directly when this file is ran (e.g. pnpm run dev)

sync().catch(console.error);
