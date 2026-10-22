import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nila Clinic – Skin & Hair Care | Treatment Showcase',
  description: 'Interactive tablet treatment showcase for clinical skin and hair procedures with before-and-after results comparison for patient consultation.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo-icon.svg', type: 'image/svg+xml' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/logo-icon.svg' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 3,
  userScalable: true,
  themeColor: '#0A66B2',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F3F8FC] text-slate-900 selection:bg-[#0A66B2] selection:text-white">
        {children}
      </body>
    </html>
  );
}
