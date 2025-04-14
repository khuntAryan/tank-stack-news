import { db } from "@/adapter";
import type { Context } from "@/context";
import { postsTable } from "@/db/schemas/posts";
import { loggedIn } from "@/middleware/loggedIn";
import { createPostSchema, paginationSchema, type SuccessResponse } from "@/shared/types";
import { zValidator } from "@hono/zod-validator";
import { and, asc, countDistinct, desc, eq } from "drizzle-orm";
import { Hono } from "hono";


export const postRouter = new Hono<Context>().post('/',loggedIn,zValidator("form",createPostSchema),async(c)=>{
    const {title,content,url}  = c.req.valid("form");
    const user = c.get("user")!;
    const[post] = await db.insert(postsTable).values({
        title,
        content,
        url,
        userId: user.id
    }).returning({id:postsTable.id})
    return c.json<SuccessResponse>({
        success:true,
        message:"post created",
        data:{postId:post?.id},
    },201)
}).get("/",zValidator("query",paginationSchema),async(c)=>{
    const {page,sortBy,order,author,limit,site} = c.req.valid("query");
    const user = c.get("user");

    const offset = (page-1)*limit;

    const sortByColoumn = sortBy === "points" ? postsTable.points : postsTable.createdAt;

    const sortOrder = order === "desc" ? desc(sortByColoumn) : asc(sortByColoumn);

    const [count] = await db.select({count:countDistinct(postsTable.id)}).from(postsTable).where(and(author ? eq(postsTable.userId,author):undefined,site ? eq(postsTable.url,site): undefined))
})