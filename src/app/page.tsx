import { redirect } from 'next/navigation';

// For dynamic deployments, the middleware also handles `/`, but this is a
// safe fallback that redirects the root path to the default locale (`/en`).
export default function RootPage() {
  redirect('/en');
}