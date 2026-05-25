import { redirect } from 'next/navigation';

// The root page redirects to a sample cinematic/signature experience.
// In production, share the direct /experience/[theme]/[tier]?id=... URL.
export default function HomePage() {
  redirect('/experience/cinematic/signature?id=abc123');
}
