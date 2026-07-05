import React from 'react'
import { Link, useLocation } from 'react-router';
import useAuthUser from '../hook/useAuthUser';
import { ShipWheelIcon } from 'lucide-react';

const Sidebar = () => {
      const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  console.log(currentPath);
  return (
    <div className='w-64'>Sidebar</div>
  )
}

export default Sidebar