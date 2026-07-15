// Vercel Edge Middleware — Basic Auth gate for the whole site.
export const config = { matcher: '/((?!favicon.ico).*)' };

export default function middleware(request) {
  const USER = process.env.BRAIN_USER || 'philip';
  const PASS = process.env.BRAIN_PASSWORD || 'changeme';
  const auth = request.headers.get('authorization');
  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      try {
        const [u, p] = atob(encoded).split(':');
        if (u === USER && p === PASS) return; // authorized -> continue
      } catch (e) {}
    }
  }
  return new Response('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Second Brain", charset="UTF-8"' },
  });
}
