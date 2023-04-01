import clerkClient, { type User } from "@clerk/clerk-sdk-node";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) => ({
  id: user.id,
  username: user.emailAddresses[0]?.emailAddress,
  profileImageUrl: user.profileImageUrl,
})

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({ take: 100 });
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
});
