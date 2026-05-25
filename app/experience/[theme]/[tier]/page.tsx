import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import { ExperienceRenderer } from './ExperienceRenderer';
import { ExperienceData } from '@/components/types';
import { themes } from '@/components/themes/themeConfigs';

interface PageProps {
  params: { theme: string; tier: string };
  searchParams: { id?: string };
}

/**
 * Dynamic route: /experience/[theme]/[tier]?id=[experienceId]
 *
 * Server component that:
 * 1. Reads the JSON data file for the given experience ID
 * 2. Validates that theme/tier match the URL parameters
 * 3. Passes data to the client ExperienceRenderer
 */
export default async function ExperiencePage({ params, searchParams }: PageProps) {
  const { theme: themeParam, tier: tierParam } = params;
  const id = searchParams.id;

  // Validate theme exists
  if (!themes[themeParam]) {
    notFound();
  }

  // If no id provided, show a helpful placeholder
  if (!id) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem',
          background: '#0B0F1A',
          color: '#F0F0F0',
          fontFamily: 'monospace',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.3em', opacity: 0.4, textTransform: 'uppercase' }}>
          The Kasi Experience
        </p>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 300, opacity: 0.8 }}>
          No experience ID provided
        </h1>
        <p style={{ fontSize: '0.875rem', opacity: 0.4 }}>
          Add <code>?id=your_experience_id</code> to the URL
        </p>
        <p style={{ fontSize: '0.75rem', opacity: 0.3, marginTop: '1rem' }}>
          Example: /experience/cinematic/signature?id=abc123
        </p>
      </div>
    );
  }

  // Load JSON data
  let data: ExperienceData;
  try {
    const filePath = path.join(process.cwd(), 'data', 'experiences', `${id}.json`);
    const raw = await fs.readFile(filePath, 'utf-8');
    data = JSON.parse(raw) as ExperienceData;
  } catch {
    notFound();
  }

  // Validate theme and tier match URL params
  if (data.theme !== themeParam || data.tier !== tierParam) {
    notFound();
  }

  return <ExperienceRenderer data={data} themeKey={themeParam} tierKey={tierParam} />;
}

// Generate static metadata based on experience
export async function generateMetadata({ params, searchParams }: PageProps) {
  const id = searchParams.id;
  if (!id) return { title: 'The Kasi Experience' };

  try {
    const filePath = path.join(process.cwd(), 'data', 'experiences', `${id}.json`);
    const raw = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(raw) as ExperienceData;
    return {
      title: `A ${data.eventType} Experience for ${data.recipientName}`,
      description: 'A cinematic, personalized digital experience.',
    };
  } catch {
    return { title: 'The Kasi Experience' };
  }
}
