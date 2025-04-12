import { relations } from "drizzle-orm";
import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./auth";

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  url: text("url"),
  content: text("content"),
  points: integer("points").default(0).notNull(),
  commentCount: integer("comment_count").default(0).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow().notNull(),
});


export const postRelations = relations(postsTable,({one})=>({
    author: one(userTable,{
        fields:[postsTable.userId],
        references:[userTable.id],
        relationName: "author",
    })
}))
