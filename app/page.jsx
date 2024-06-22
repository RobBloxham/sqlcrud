import prisma from "@/lib/prisma";
import Post from "./components/Post";
import Link from "next/link";

async function getPosts(){
  const posts = await prisma.post.findMany({
    where: {published: true},
    include: {
      author: {
        select: {name: true}
      }
    }
  })
  return posts
}

export default async function Home() {
  const posts = await getPosts()
  return (
    <main className="flex min-h-screen flex-col items-center justify-normal p-24">
      <h1>Feed</h1>
      <div className="p-20">
        <Link href="/add-post"> Add Post </Link>
      </div>
      <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          authorName={post.author.name}
          title={post.title}
          content={post.content}
        />
      ))}
      </div>
    </main>
  );
}
