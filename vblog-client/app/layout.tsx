import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/providers/AppProvider';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900', '100', '200', '300'],
});

export const metadata: Metadata = {
  title: "vBlog - vbao's Blog",
  description:
    'vBlog is a blog platform for everyone to share their knowledge and experiences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${montserrat.className} antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
