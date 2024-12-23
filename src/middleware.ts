import {NextRequest, NextResponse} from 'next/server';
import AuthManagerGuard from "@/guard/AuthManagerGuard";

export function middleware(request: NextRequest) {
    const userToken = request.cookies.get('token')?.value;

    const isAuthenticated = AuthManagerGuard.isLoggedIn(userToken);

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
