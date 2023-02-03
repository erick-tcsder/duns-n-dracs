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
import { RedirectionPage } from './pages/RedirectionPage'
import { GameSelectionPage } from './pages/GameSelectionPage'
import { GamePage } from './pages/GamePage'


const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <div>404</div>,
    children: [
      {
        path: '/',
        element: <RedirectionPage/>
      },
      {
        path: '/init',
        element: <InitPage/>
      },
      {
        path: '/character',
        element: <CharacterPage/>
      },
      {
        path: '/game-selection',
        element: <GameSelectionPage/>
      },
      {
        path: '/duns-n-dracs',
        element: <GamePage/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <NameGeneratorContextProvider>
    <RouterProvider router={router}/>
  </NameGeneratorContextProvider>,
)
