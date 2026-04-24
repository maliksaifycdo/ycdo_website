import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/login';

  const token =
    request.cookies.get('ycdo_token')?.value ||
    request.cookies.get('ycdo-auth')?.value;

  if (isAdminRoute && !token) {
    return NextResponse.next();
  }

  if (isLoginPage && token) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};

