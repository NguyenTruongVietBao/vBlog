'use client';
import { ThemeProvider } from 'next-themes';
import QueryProvider from './QueryProvider';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from './AuthProvider';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
