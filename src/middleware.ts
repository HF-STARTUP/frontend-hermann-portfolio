import {NextRequest, NextResponse} from 'next/server';
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import NAVIGATIONS_URL from "@/utils/navigation";

export function middleware(request: NextRequest) {
    const userToken = request.cookies.get('token')?.value;

    const isAuthenticated = AuthManagerGuard.isLoggedIn(userToken);

    const {pathname} = request.nextUrl;


    if (pathname.startsWith('/auth')) {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL(NAVIGATIONS_URL.dashboard.url, request.url));
        }
        return NextResponse.next()
    }

    if (isAuthenticated && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/app', request.url));
    }

    if (!isAuthenticated && request.nextUrl.pathname.startsWith('/app')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login', '/app/:path*']
};
