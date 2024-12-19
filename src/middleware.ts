import {NextRequest, NextResponse} from 'next/server';
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import {ResponseCookie} from "next/dist/compiled/@edge-runtime/cookies";
import {EnvVars} from "@/utils/const/envVars";

export async function middleware(request: NextRequest) {
    const userToken = request.cookies.get('token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;

    const isAuthenticated = AuthManagerGuard.isLoggedIn(userToken);

    if (isAuthenticated && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/app', request.url));
    }

    if (isAuthenticated) {
        return NextResponse.next();
    } else {
        console.log("Token expired");

        try {
            const response = await fetch(`${EnvVars.NP_API_ENDPOINT}/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({refresh_token: refreshToken}),
            });

            if (response.ok) {
                const resp = await response.json();
                const data = resp.data;

                console.log("Refresh token success", JSON.stringify(data));

                if (data.token && data.refresh_token) {
                    // Utiliser NextResponse pour définir les nouveaux cookies
                    const nextResponse = NextResponse.next();

                    const COOKIE_CONFIG = {
                        // secure: true,
                        path: '/',
                        sameSite: 'lax',
                    } as Partial<ResponseCookie>

                    nextResponse.cookies.set("token", data.token, COOKIE_CONFIG);
                    nextResponse.cookies.set("refresh_token", data.refresh_token, COOKIE_CONFIG);

                    console.log(`Token Stored`);

                    // Retourner la réponse avec les nouveaux cookies
                    return nextResponse;
                } else {
                    console.log("Token Not Stored !");
                }
            } else {
                console.log("Could not refresh token, redirecting to login...");
                return NextResponse.redirect(new URL('/login', request.url));
            }
        } catch (err) {
            console.log("Error while refreshing token:", err);
            return NextResponse.redirect(new URL('/login', request.url));
        }

        console.log("Get out here ===>");
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login', '/app/:path*']
};
