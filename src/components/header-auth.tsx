'use client';
import { NavbarItem,Button,Avatar,Popover,PopoverContent,PopoverTrigger } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from "react";
import {signIn, signOut} from '@/actions';

export default function HeaderAuth(){
  const session = useSession();
  let authContent : React.ReactNode;
  if(session.status==='loading'){
    authContent=null;
  }
  else if(session.data?.user){
    authContent = (
    <Popover placement="left">
      <PopoverTrigger>
        <Avatar src={session.data.user.image || ""}/>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <form action={signOut}>
            <Button type="submit" className="h-10 w-20">Sign Out</Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>)
  }else{
    authContent = <>
      <NavbarItem>
        <form action={signIn}>
          <Button type="submit" color="secondary" variant="bordered" className="h-10 w-20">Sign In</Button>
        </form>
      </NavbarItem>
      <NavbarItem>
        <form action={signIn}>
          <Button type="submit" color="primary" variant="flat" className="h-10 w-20">Sign Up</Button>
        </form>
      </NavbarItem>
    </>
  }
  return authContent;
}