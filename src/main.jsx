import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WeatherContextProvider from './contexts/WeatherContext.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WeatherContextProvider>
        <App />
      </WeatherContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
