import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod";
import { sessionTable, userTable } from "./db/schemas/auth";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";


const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
});


const processENV = EnvSchema.parse(process.env);


const queryClient = postgres(processENV.DATABASE_URL);


export const db = drizzle(queryClient, {
  schema:{
    user: userTable,
    session: sessionTable
  }
});

export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

