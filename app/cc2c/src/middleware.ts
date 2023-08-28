// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
export async function middleware(request: NextRequest, _next: NextFetchEvent) {
    const { pathname } = request.nextUrl;

    if (pathname === '/') {
        const token = await getToken({ req: request });
        if (token) {
            const url = new URL(`/dashboard`, request.url);
            return NextResponse.redirect(url);
        }
    }

    if (pathname === '/dashboard') {
        const token = await getToken({ req: request });
        if (!token) {
            const url = new URL(`/signin`, request.url);
            url.searchParams.set('callbackUrl', encodeURI(request.url));
            return NextResponse.redirect(url);
        }
        if (token.role === 'ADMIN') {
            const url = new URL(`/admin/dashboard`, request.url);
            return NextResponse.redirect(url);
        }
        if (token.role === 'TEACHER') {
            const url = new URL(`/teacher/dashboard`, request.url);
            return NextResponse.redirect(url);
        }
    }

    const adminPaths = ['/admin', '/admin/*', 'class/create'];
    const matchesAdminPath = adminPaths.some((path) => pathname.startsWith(path));
    if (matchesAdminPath) {
        const token = await getToken({ req: request });
        if (!token) {
            const url = new URL(`/signin`, request.url);
            url.searchParams.set('callbackUrl', encodeURI(request.url));
            return NextResponse.redirect(url);
        }
        if (token.role !== 'ADMIN') {
            const url = new URL(`/403`, request.url);
            return NextResponse.rewrite(url);
        }
    }

    const teacherPaths = ['/teacher', '/teacher/*'];
    const matchesTeacherPath = teacherPaths.some((path) => pathname.startsWith(path));
    if (matchesTeacherPath) {
        const token = await getToken({ req: request });
        console.log('token', token);
        if (!token) {
            const url = new URL(`/signin`, request.url);
            url.searchParams.set('callbackUrl', encodeURI(request.url));
            return NextResponse.redirect(url);
        }
        if (token.role !== 'TEACHER') {
            const url = new URL(`/403`, request.url);
            return NextResponse.rewrite(url);
        }
    }

    return NextResponse.next();
}
