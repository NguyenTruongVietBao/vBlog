import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Define protected and unprotected paths
const privatePaths = ['/setting', '/profile'];
const publicPaths = ['/login', '/register', '/forgot-password'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get('accessToken')?.value;

  const isPrivatePath = privatePaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}`)
  );
  const isPublishPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}`)
  );

  // Chưa đăng nhập
  if (isPrivatePath && !accessToken) {
    const url = new URL('/login', req.url);
    url.searchParams.set('clearTokens', 'true');
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Đã đăng nhập
  if (isPublishPath && accessToken) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/setting', '/profile', '/login', '/register', '/change-password'],
};
