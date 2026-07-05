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
import PageLoader from './components/PageLoader'
import useAuthUser from './hook/useAuthUser'

const App = () => {

  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />
  return (

    <div className=' h-screen'>

      <Routes>
        <Route path='/' element={isAuthenticated && isOnboarded ? (
          <HomePage />
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )} />
        <Route path='/signup' element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
        <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path='/onboarding'
          element={isAuthenticated ? (
            !isOnboarded ? (
              <OnboardingPage />
            ) : (
              <Navigate to="/" />
            )
          ) : (
            <Navigate to="/login" /> 
        )} />
        <Route path='/chat' element={isAuthenticated ? <ChatPage /> : <Navigate to='/login' />} />
        <Route path='/call' element={isAuthenticated ? <CallPage /> : <Navigate to='/login' />} />
        <Route path='/notification' element={isAuthenticated ? <NotificationPage /> : <Navigate to='/login' />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App