import { auth } from "@/auth";
import LogoutButton from "@/components/shared/logout-button";
import { headers } from "next/headers";
import React from "react";

interface Props { }
type Session = typeof auth.$Infer.Session;

async function Page(props: Props) {


  const { } = props;



  // get the sessionn using axios
  // const requestHeaders = await headers();
  // const r = await axios.get('http://localhost:3000/api/auth/get-session', {
  //   headers: {
  //     cookie: requestHeaders.get('cookie') || ''
  //   }
  // })


  // get the session using auth api { session , user }
  const { user } = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  }) as Session;


  return (
    <div className="h-screen flex flex-col items-center justify-center ">
      <div className="text-center text-white mb-10">
        <p className="text-center">{user.name}</p>
        <p>{user.email}</p>
      </div>

      <LogoutButton />
    </div>
  );
}

export default Page;
