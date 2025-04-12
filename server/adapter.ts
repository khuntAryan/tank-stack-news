import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod";


const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
});


const processENV = EnvSchema.parse(process.env);


const queryClient = postgres(processENV.DATABASE_URL);


const db = drizzle(queryClient);


(async () => {
  try {
    const result = await db.execute("select 1");
    console.log(result);
  } catch (error) {
    console.error("Database query failed:", error);
  }
})();
