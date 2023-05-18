import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './scss/index.scss'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorResult from './components/Result/ErrorResult'
import { AppProvider } from './context/AppContext'
import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // Import the Vietnamese locale
import { ConfigProvider, DatePicker } from 'antd'
import locale from 'antd/lib/locale/vi_VN';
dayjs.locale('vi'); // Set the locale to Vietnamese



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <ConfigProvider locale={locale}>
        <ErrorBoundary fallback={<ErrorResult />}>
          <App />
        </ErrorBoundary>
      </ConfigProvider>
    </AppProvider>
  </React.StrictMode>,
)
