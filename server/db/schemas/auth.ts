import { pgTable,text, timestamp } from "drizzle-orm/pg-core";
// copy the basic code from docs of lucia 
// but they don't have the username and password filed
// so we need to add that
export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
    username: text("username").notNull().unique(),
    password_hash:text("password_hash").notNull()
});

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});
