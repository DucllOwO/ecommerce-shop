import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './scss/index.scss'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorResult from './components/Result/ErrorResult'
import { AppProvider } from './context/AppContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <ErrorBoundary fallback={<ErrorResult />}>
        <App />
      </ErrorBoundary>
    </AppProvider>
  </React.StrictMode>,
)
