import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Convex React client is optional; our app uses HTTP client wrappers.
// Guard provider to avoid runtime crashes when VITE_CONVEX_URL is missing in production.
import { ConvexProvider, ConvexReactClient } from 'convex/react'
const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined
const convexClient = convexUrl ? new ConvexReactClient(convexUrl) : null

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {convexClient ? (
      <ConvexProvider client={convexClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConvexProvider>
    ) : (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )}
  </StrictMode>,
)
