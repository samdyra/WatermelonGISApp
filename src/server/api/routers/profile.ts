import clerkClient, { type User } from "@clerk/clerk-sdk-node";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

const filterUserForClient = (user: User) => ({
  id: user.id,
  username: user.emailAddresses[0]?.emailAddress,
  profileImageUrl: user.profileImageUrl,
});

export const profileRouter = createTRPCRouter({
  getUserByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      const [ user ] = await clerkClient.users.getUserList({ emailAddress: [ input.email ], });

      if (!user) {
        throw new Error("User not found");
      }

      return filterUserForClient(user);
    }),
});
