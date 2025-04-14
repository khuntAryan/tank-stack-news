import { db } from "@/adapter";
import type { Context } from "@/context";
import { postsTable } from "@/db/schemas/posts";
import { loggedIn } from "@/middleware/loggedIn";
import { createPostSchema, type SuccessResponse } from "@/shared/types";
import { zValidator } from "@hono/zod-validator";
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
}).get("/",zValidator("query",))