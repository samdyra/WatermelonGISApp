import { type NextPage } from "next";
import Head from "next/head";
import { api, type RouterOutputs } from "~/utils/api";
import { SignIn, SignInButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";

const CreatePostWizard = () => {
  const { user } = useUser();
  const ctx = api.useContext()

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate()
    },
    onError: () => {
      toast.error("Something Went Wrong!");
    }
  });
  const [ input, setInput ] = useState<string>("");

  if (!user) return null;

  return (
    <div className="flex gap-3 border-b border-slate-400 p-4">
      <Image
        width={50}
        height={50}
        src={user?.profileImageUrl}
        className="rounded-full"
        alt="Profile Image"
      />
      <input
        placeholder="Type some emojis"
        className="w-full bg-transparent outline-none"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        type="text"
        disabled={isPosting}
      />
      <button onClick={() => mutate({ content: input })}>Post</button>
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <div className="flex gap-3 border-b border-slate-400 p-4">
      <Image
        src={author.profileImageUrl}
        alt="User Image"
        width={50}
        height={50}
        className=" rounded-full"
      />
      <div>
        <Link href={`example/${author.username!}`}>
          <h1 className="text-xs text-gray-600">{author.username}</h1>
        </Link>
        <h1 className="text-sm">{post.content}</h1>
      </div>
    </div>
  );
};

const Example: NextPage = () => {
  const user = useUser();
  const { data, isLoading } = api.posts.getAll.useQuery();
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <Head>
        <title>🍉Watermelon GIS App</title>
        <meta name="description" content="Fruits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full border-x border-slate-200 md:max-w-2xl">
          <div className="border-b border-slate-400">
            {!user.isSignedIn && (
              <div className="flex justify-center">
                <SignInButton />
              </div>
            )}
            {user.isSignedIn && <CreatePostWizard />}
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
          </div>
          <div className="flex flex-col">
            {data?.map((fullPost) => (
              <PostView {...fullPost} key={fullPost.post.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Example;
