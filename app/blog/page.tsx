'use client'
import { title } from "@/components/primitives";
import { useSession } from "next-auth/react";

export default function BlogPage() {

  const{data: session} = useSession();



  return (
    <div>
      <h1 className={title()}>Blog</h1>
      <h1>{session ? "Welcome" : "You are not signed in"}</h1>
      <h1>{session?.username}</h1>
      <h1>{session?.accessToken}</h1>
    </div>
  );
}
