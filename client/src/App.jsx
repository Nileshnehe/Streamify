import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './features/home/HomePage'
import Signup from './features/auth/pages/Signup'
import Login from './features/auth/pages/Login'
import OnboardingPage from './features/auth/pages/OnboardingPage'
import ChatPage from './features/chats/ChatPage'
import CallPage from './features/calls/CallPage'
import NotificationPage from './features/notification/NotificationPage'
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query'
import { API } from './services/api'
import PageLoader from './components/PageLoader'
import { getAuthUser } from './features/services/api'

const App = () => {
  const { data: authData, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  const authUser = authData?.user

  if (isLoading) return <PageLoader />
  return (

    <div className=' h-screen'>
      
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path='/onboard' element={authUser ? <OnboardingPage /> : <Navigate to='/login' />} />
        <Route path='/chat' element={authUser ? <ChatPage /> : <Navigate to='/login' />} />
        <Route path='/call' element={authUser ? <CallPage /> : <Navigate to='/login' />} />
        <Route path='/notification' element={authUser ? <NotificationPage /> : <Navigate to='/login' />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App