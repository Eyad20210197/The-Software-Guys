import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Software Guys | SaaS Portfolio & Admin Dashboard',
  description: 'High-contrast production-grade Neo-Brutalist portfolio platform.',
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  const locale = params.locale ?? 'en';
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className="font-sans antialiased min-h-screen bg-brand-bg text-brand-dark">
        {children}
      </body>
    </html>
  );
}
