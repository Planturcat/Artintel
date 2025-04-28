"use client";

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from '@/contexts/LanguageContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <AuthProvider>
          <LanguageProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#121212',
                color: '#fff',
                border: '1px solid #333',
              },
              success: {
                iconTheme: {
                  primary: '#00cbdd',
                  secondary: '#121212',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ff5555',
                  secondary: '#121212',
                },
              },
            }}
          />
          </LanguageProvider>
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
