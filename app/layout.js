import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from './Providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'My Shop',
  description: 'Discover the latest trends and shop stylish outfits with My Shop – where fashion meets convenience.',
  icons: {
    icon: '/shop-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
