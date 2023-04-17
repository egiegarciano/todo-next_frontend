import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authenticatedUrls = ['/current-todo', '/create-todo', '/completed-todo']
const unauthenticatedUrls = ['/login', '/signup']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const authToken = req.cookies.get('token')?.value

  if (unauthenticatedUrls.some((url) => pathname.endsWith(url))) {
    if (authToken) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  if (authenticatedUrls.some((url) => pathname.endsWith(url))) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
