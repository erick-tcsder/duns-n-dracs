import React from 'react'
import ReactDOM from 'react-dom/client'
import AppLayout from './pages/AppLayout'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { NameGeneratorContextProvider } from './components/layouts/NameGeneratorContext'
import { CharacterPage } from './pages/CharacterPage'
import { InitPage } from './pages/InitPage'


const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <div>404</div>,
    children: [
      {
        path: '/init',
        element: <InitPage/>
      },
      {
        path: '/character',
        element: <CharacterPage/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <NameGeneratorContextProvider>
    <RouterProvider router={router}/>
  </NameGeneratorContextProvider>,
)
