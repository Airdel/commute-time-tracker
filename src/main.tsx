import { StrictMode } from 'react'
import { ErrorBoundary } from "react-error-boundary"

import { ErrorFallback } from './ErrorFallback.tsx'

import App from './App.tsx'

export default function Root() {
  return (
    <StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </StrictMode>
  )
}







