import Head from "next/head";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface ISGProps {
  posts: Post[];
}

export default function ISG({ posts }: ISGProps) {
  return (
    <div>
      <Head>
        <title>ISG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>一覧</h1>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <Link prefetch={false} href={`/isg/posts/${post.id}`}>
                  {post.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<ISGProps> = async (
  _context: GetStaticPropsContext
) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = (await res.json()) as Post[];

  return {
    props: {
      posts,
    },
  };
};
