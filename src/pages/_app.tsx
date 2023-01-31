import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '../utils/api';

import '../styles/globals.css';

import { M_PLUS_Rounded_1c } from '@next/font/google';
const mplus = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mplus',
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <main className={`${mplus.variable}`}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
