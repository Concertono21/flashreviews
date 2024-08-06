// pages/_app.js
import { SessionProvider } from 'next-auth/react';
import '../app/globals.css';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </SessionProvider>
  );
}

export default MyApp;