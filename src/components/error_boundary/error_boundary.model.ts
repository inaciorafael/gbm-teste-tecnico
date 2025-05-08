import { ReactNode } from 'react'

export type ErrorBoundaryProps = {
  fallback?: ReactNode;
  children: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};
