import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

interface VerifyPayload extends JWTPayload {
    sub: string;
    role: "STUDENT" | "TEACHER" | "TPO" | "SUPER_ADMIN" | "COLLEGE_ADMIN" | "HR" | "RECRUITER";
    userId: number | string;
}

const key = new TextEncoder().encode(process.env.JWT_SECRET_KEY ||"default_secret_key");

export const proxy = async (req: NextRequest) => {

    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    const isPublicPath = ["/login", "/accept-invite", "/register/student", "/register/company", "/reset-password"].includes(pathname);

    if(!token) {
        if(!isPublicPath) 
            return NextResponse.redirect(new URL("/login", req.url))
        return NextResponse.next();
    }

    try {

        const { payload } = await jwtVerify(token, key); 
        const decodedToken = payload as VerifyPayload;

        const role = decodedToken.role.toLowerCase();;

        if(isPublicPath) 
            return NextResponse.redirect(new URL(`/${role}/dashboard`, req.url));

        if(!pathname.startsWith(`/${role}`)){
            return NextResponse.redirect(new URL(`/${role}/dashboard`, req.url));
        } 

    }
    catch (err: any) {

        if(isPublicPath) {
            const res = NextResponse.next();
            res.cookies.set("token", "", { maxAge: 0 });
            return res;
        }

        const res = NextResponse.redirect(new URL("/login", req.url));
        res.cookies.set("token", "", { maxAge: 0 });
        return res;
    }

    return NextResponse.next();

}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp)$|logo.png).*)',
  ],
}