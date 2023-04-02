import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const ProfilePage: NextPage<{email: string}> = ({ email }) => {
  
  const { data } = api.profile.getUserByEmail.useQuery({ email });

  if (!data) return <h1>Not Found</h1>;

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main className="flex h-screen justify-center">{data.username}</main>
    </>
  );
};

import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  const slug = context.params?.slug;

  const email = slug

  if (typeof slug !== "string") {
    throw new Error("Slug is required");
  }

  await ssg.profile.getUserByEmail.prefetch({ email: slug });

  return { props: { trpcState: ssg.dehydrate(), email } };
};

export const getStaticPaths = () => ({ paths: [], fallback: "blocking" })

export default ProfilePage;
