import axios from "axios";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";


//this middlawre to control the protected pages if the user is not logged in
export const middleware = async (req: NextRequest) => {
    const protectedRoutes = ['/dashboard'];
    const loginRoutes = ['', '/', '/register'];
    type Session = typeof auth.$Infer.Session;


    // get session
    const response = await axios.get<Session>('/api/auth/get-session', {
        baseURL: req.nextUrl.origin,
        headers: {
            cookie: req.headers.get('cookie') || ''
        }
    });


    // the user has to login 
    if (!response.data?.session && protectedRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    }
    // if the user is logged in , dont login another time
    else if (response.data?.session && loginRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin));
    }



    // otherwise complete the request
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard', '/register']
}