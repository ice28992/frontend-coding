import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '都道府県別の人口推移グラフ',
  description: '都道府県別の人口推移グラフを表示するSPAです。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
