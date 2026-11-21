import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import TanstackProvider from '@/providers/TanstackProvider/TanstackProvider';
import AuthProvider from '@/providers/AuthProvider/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import { Flip, ToastContainer } from 'react-toastify';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';

const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['400', '500'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://learn-lingo-one-delta.vercel.app'),
  title: 'Learn Lingo',
  description:
    'Learn foreign languages with professional tutors. Browse teachers, read reviews, and book personalized lessons with Learn Lingo.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://learn-lingo-one-delta.vercel.app/',
    siteName: 'Learn Lingo',
    title: 'Learn Lingo - Find Your Perfect Language Tutor',
    description:
      'Master new languages with experienced tutors. Discover personalized lessons, trusted reviews, and flexible scheduling.',
    images: [
      {
        url: '/opengraph.webp',
        width: 1200,
        height: 630,
        alt: 'Learn Lingo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn Lingo - Find Your Perfect Language Tutor',
    description:
      'Master new languages with experienced tutors and personalized online lessons.',
    images: ['/opengraph.webp'],
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanstackProvider>
          <AuthProvider>
            <Header />
            {children}
            <ScrollToTop />
            <ToastContainer
              position="top-center"
              autoClose={3000}
              limit={1}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition={Flip}
              toastStyle={{
                background: '#9fbaae',
                color: '#fff',
                borderRadius: '12px',
              }}
            />
          </AuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
