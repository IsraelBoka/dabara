import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '../utils/api';

import '../styles/globals.css';

import { Inter } from '@next/font/google';

import { M_PLUS_Rounded_1c } from '@next/font/google';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400'],
});

const roboto = M_PLUS_Rounded_1c({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-roboto',
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <main className={`${inter.className} , ${roboto.variable}`}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
