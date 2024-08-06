import {NextRequest, NextResponse} from 'next/server'
import NAVIGATIONS_URL from "@/utils/navigation";
import AuthManagerGuard from "@/guard/AuthManagerGuard";

export function middleware(request: NextRequest) {

    const userToken = request.cookies.get('token')?.value
    //const isAuthenticated = AuthManagerGuard.isLoggedIn()
    const isAuthenticated = true
    
    //console.log("IsAuthentificated====>", isAuthenticated)

    if (isAuthenticated) {
        return NextResponse.next()
    }

    return NextResponse.redirect(new URL("/login", request.url))
}

export const config = {
    matcher: '/app/:path*',
}
