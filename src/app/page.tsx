import { BrazilianGovernmentTimeline } from '@/components/BrazilianGovernmentTimeline'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minha Era Política',
  description: 'Explore a história política do Brasil durante sua vida. Veja quais presidentes, partidos e ideologias governaram desde que você nasceu com visualizações interativas e compartilhe sua jornada política.',
  
  // Open Graph (Facebook, Instagram, WhatsApp)
  openGraph: {
    title: 'Descubra sua Era Política no Brasil 🗳️',
    description: 'Explore a história política do Brasil durante sua vida. Veja quais presidentes, partidos e ideologias governaram desde que você nasceu.',
    type: 'website'
  },

  // Twitter
  twitter: {
    card: 'summary',
    title: 'Descubra sua Era Política no Brasil 🗳️',
    description: 'Veja quais presidentes e partidos governaram durante sua vida! #Brasil #Política'
  }
}

export default function Home() {
  return (
    <BrazilianGovernmentTimeline />
  );
}
