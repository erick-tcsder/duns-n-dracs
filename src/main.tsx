import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { NameGenerationService } from './services/NameGenerationService'
import random from 'random'
import { NameGeneratorContextProvider } from './components/layouts/NameGeneratorContext'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404</div>,
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <NameGeneratorContextProvider>
    <RouterProvider router={router}/>
  </NameGeneratorContextProvider>,
)
