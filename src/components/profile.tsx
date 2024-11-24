'use client';
import { useSession } from "next-auth/react";

export default function Profile(){
  const session = useSession();
  if(session.data?.user)
  return (
    <div>User is logged in!</div>
  )
  return (
    <div>User is logged out!</div>
  )
}