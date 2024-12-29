import React from 'react'
import TicketBookingComponent from '../components/TicketBookingComponent'
import { useSelector } from 'react-redux';

function Dashboard() {

  const { user } = useSelector((state) => state.auth);


  return (
    <>
      <div className="text-xl font-semibold text-gray-800 mb-4">
       Logged User Name: <span className="text-blue-600">{user?.user?.name || "Guest"}</span>
      </div>    <TicketBookingComponent currentUser={user?.user?.name || "Guest"} />
    </>
  )
}

export default Dashboard