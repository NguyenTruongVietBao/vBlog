import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/components/providers/AppProvider';
import Header from '@/components/layout/header';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900', '100', '200', '300'],
});

export const metadata: Metadata = {
  title: "vBlog - vbao's Blog",
  description:
    'vBlog is a blog platform for everyone to share their knowledge and experiences.',
  metadataBase: new URL('https://www.vblog.site'),
  keywords: ['vblog', 'vbao', 'vblog.site', 'nt.vbao', 'blog'],
  authors: [
    { name: 'Nguyễn Trương Viết Bảo', url: 'https://www.nguyentvbao.site' },
  ],
  openGraph: {
    title: 'vBlog',
    description: 'Chia sẻ kiến thức công nghệ và đời sống.',
    url: 'https://www.vblog.site',
    images: [
      {
        url: 'https://www.vblog.site/logo.png',
        width: 800,
        height: 600,
      },
    ],
    siteName: 'vBlog',
    type: 'website',
    locale: 'vi_VN',
    countryName: 'Việt Nam',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vblog',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${montserrat.className}`}>
        <AppProvider>
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
