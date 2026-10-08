import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Canonical host. Force https and the www host so only one URL is indexed.
const CANONICAL_HOST = 'www.princesstgardens.com';
const DOMAIN = 'princesstgardens.com';

export default function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const hostHeader = request.headers.get('host') ?? '';
  const host = hostHeader.split(':')[0].toLowerCase();
  const proto =
    request.headers.get('x-forwarded-proto') ??
    (nextUrl.protocol === 'https:' ? 'https' : 'http');

  // Only normalise on the production domain (ignore localhost / preview hosts).
  const isProdHost = host === DOMAIN || host === `www.${DOMAIN}`;
  if (isProdHost && (host !== CANONICAL_HOST || proto !== 'https')) {
    const url = nextUrl.clone();
    url.protocol = 'https';
    url.host = CANONICAL_HOST;
    url.port = '';
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
