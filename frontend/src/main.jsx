import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ConfigProvider } from 'antd'
import { Routes } from './Routes/Routes'
import { store } from './Redux/store'
import { theme } from './Utils/theme'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <RouterProvider router={Routes} />
        <Toaster position="top-center" />
      </ConfigProvider>
    </Provider>
  </StrictMode>,
)
