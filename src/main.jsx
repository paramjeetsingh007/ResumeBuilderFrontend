import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in'
import Home from './Home/Home'
import Dashboard from './dashboard/Dashboard'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeid]/EditResume'
import ViewResume from './my-resume/[resume-Id]/view/ViewResume'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
 
    element:<App/>,
    children:[
     
      {
        path :'/dashboard',
        element:<Dashboard/>
      },
     
      {
        path :'/dashboard/resume/:resumeId/edit',
        element:<EditResume/>
      },
    ]

  },

  {
    path:'/auth/sign-in',
    element:<SignInPage/>
  },
  {
     path:'/my-resume/:resumeId/view',
     element:<ViewResume/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
     <RouterProvider router={router}/>
    </ClerkProvider>
   
  </StrictMode>,
)
