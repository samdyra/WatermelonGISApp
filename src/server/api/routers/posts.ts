
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({ getAll: publicProcedure.query(({ ctx }) => ctx.prisma.post.findMany()) });
