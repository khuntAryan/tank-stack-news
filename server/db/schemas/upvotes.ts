
import { pgTable,serial,integer,timestamp } from "drizzle-orm/pg-core";


export const postUpvotesTable = pgTable("post_upvotes",{
    id: serial("id").primaryKey(),
    postId: integer("post_id").notNull(),
    userId: integer("user_id").notNull(),
    createdAt: timestamp("created_at",{
        withTimezone: true,
    }).defaultNow().notNull()
})

export const commentUpvotesTable = pgTable("comment_upvotes",{
    id: serial("id").primaryKey(),
    commentId: integer("comment_id").notNull(),
    userId: integer("user_id").notNull(),
    createdAt: timestamp("created_at",{
        withTimezone: true,
    }).defaultNow().notNull()
})