import { insertPostSchema } from "@/db/schemas/posts";
import { password } from "bun";
import { z } from "zod";
export type SuccessResponse<T = unknown> = {
    success: true;
    message: string;
    data?: T;
  };
  

export type ErrorResponse<T = void> = {
    success: false,
    error: string,
    isFormError?: boolean;
}

export const loginSchema = z.object({
    username: z.string().min(3).max(31).regex(/^[a-zA-Z0-9_]+$/),
    password: z.string().min(3).max(255)
})

export const createPostSchema = insertPostSchema.pick({
    title: true,
    url: true,
    content: true
}).refine((data)=>data.url || data.content, {message:"Either url or content must be provided",path:["url","content"]})


export const sortBySchema = z.enum(["points","recent"]);
export const orderBySchema = z.enum(["asc","desc"]);

export const paginationSchema = z.object({
    limit: z.number({coerce:true}).optional().default(10),
    page: z.number({coerce:true}).optional().default(1),
    sortBy: sortBySchema.optional().default("points"),
    orderBy: orderBySchema.optional().default("desc"),
    author: z.optional(z.string()),
})