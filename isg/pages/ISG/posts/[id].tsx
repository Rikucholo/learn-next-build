import Head from "next/head";
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  GetStaticPathsContext,
} from "next";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface ISGProps {
  post: Post;
}

export default function ISGPostsId({ post }: ISGProps) {
  return (
    <div>
      <Head>
        <title>Deteil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Post詳</h1>
        <div>
          <p>Post ID: {post?.id}</p>
          <p>User ID: {post?.userId}</p>
          <p>Title: {post?.title}</p>
          <p>Body: {post?.body}</p>
        </div>
      </main>
    </div>
  );
}

type ISGParams = {
  id: string;
};
export const getStaticPaths: GetStaticPaths<ISGParams> = async (
  _context: GetStaticPathsContext
) => {
  return {
    paths: [{ params: { id: "1" } }],
    fallback: true, // true or 'blocking' for ISG
  };
};

export const getStaticProps: GetStaticProps<ISGProps> = async (
  context: GetStaticPropsContext
) => {
  const params = context.params as ISGParams;
  const postId = params.id;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = (await res.json()) as Post;

  return {
    props: {
      post,
    },
  };
};
