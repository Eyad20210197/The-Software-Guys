import React from 'react';
import { I18nProvider } from '../components/I18nProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

export const metadata = {
  title: 'The Software Guys | SaaS Portfolio & Admin Dashboard',
  description: 'High-contrast production-grade Neo-Brutalist portfolio platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-brand-bg text-brand-dark flex flex-col">
        <I18nProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
