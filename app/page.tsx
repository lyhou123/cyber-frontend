'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {

  const { data: session } = useSession();


  if (session) {
    // rendering components for logged in users
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-44 h-44 relative mb-4">
          <Image src={session.user?.image as string || ""} fill alt="" className="object-cover rounded-full"/>
        </div>
        <p className="text-2xl mb-2">Welcome <span className="font-bold">{session.user?.name}</span>. Signed In As</p>
        <p className="font-bold mb-4">{session.user?.email}</p>
        <button className="bg-red-600 py-2 px-6 rounded-md" onClick={() => signOut()}>Sign out</button></div>)

  } else {

    return (

      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p className="text-2xl mb-4">You are not signed in</p>
        <button className="bg-blue-600 py-2 px-6 rounded-md" onClick={() => signIn()}>Sign in</button>
      </div>
    )

  }

}
