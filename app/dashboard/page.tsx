import { auth } from "@/auth";
import LogoutButton from "@/components/shared/logout-button";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import { router } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface Props { }
type Session = typeof auth.$Infer.Session;

async function Page(props: Props) {


  const { } = props;

  const requestHeaders = await headers();
  console.log(requestHeaders.get('cookie'));

  const r = await axios.get('http://localhost:3000/api/auth/get-session', {
    headers: {
      cookie: requestHeaders.get('cookie') || ''
    }
  })

  const response = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });




  return (
    <div className="h-screen flex flex-col items-center justify-center ">
      <div className="text-center text-white mb-10">
        <p className="text-center">{response?.user?.name}</p>
        <p>{response?.user?.email}</p>
      </div>

      <LogoutButton />
    </div>
  );
}

export default Page;
