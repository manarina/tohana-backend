// app/providers.tsx
'use client';

import { ApolloProvider } from '@apollo/client/react'; // ✅ Bon import
import { Toaster } from 'react-hot-toast';
import { apolloClient } from '../lib/apollo-client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
      <Toaster position="top-right" />
    </ApolloProvider>
  );
}