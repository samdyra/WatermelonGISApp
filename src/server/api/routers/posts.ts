import clerkClient, { type User } from "@clerk/clerk-sdk-node";
import {
  createTRPCRouter, privateProcedure, publicProcedure 
} from "~/server/api/trpc";
import { z } from "zod";

const filterUserForClient = (user: User) => ({
  id: user.id,
  username: user.emailAddresses[0]?.emailAddress,
  profileImageUrl: user.profileImageUrl,
})

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({ take: 100, orderBy: [ { createdAt: "desc" } ] });
    const users = (await clerkClient.users.getUserList({
      userId: posts.map((post) => post.authorId),
      limit: 100,
    })).map(filterUserForClient);

    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);
      if (!author) {
        throw new Error("Author not found");
      }
      return ({
        post,
        author
      })
    })

  }),

  create: privateProcedure.input(z.object({ content: z.string().emoji().min(1).max(280), })).mutation(async ({ ctx, input }) => {
    const authorId = ctx.userId;
    const post = await ctx.prisma.post.create({ data: { authorId, content: input.content } })

    return post
  })
});
