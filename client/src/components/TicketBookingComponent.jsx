'use client'

import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../features/auth/authSlice"
import { RouteName } from "../utils/routesConstants"

const TicketBookingComponent = ({ currentUser }) => {
  const totalSeats = 80
  const seatsPerRow = 7
  const rows = Math.floor(totalSeats / seatsPerRow)

  // Initial state for seats
  const [seats, setSeats] = useState(
    Array.from({ length: totalSeats }, () => ({ status: "available", user: null }))
  )

  const [bookCount, setBookCount] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate(RouteName.login)
  }

  // Calculate available and booked seats
  const availableSeatsCount = seats.filter((seat) => seat.status === "available").length
  const bookedSeatsCount = totalSeats - availableSeatsCount

  // Booking logic
  const handleBook = (event) => {
    if (event.key === "Enter") {
      if (!currentUser) {
        alert("Please login to book seats.")
        return
      }
      // isNaN(numSeats) || ================================================
      const numSeats = parseInt(bookCount)
      if (isNaN(numSeats) || numSeats < 1 || numSeats > 7) {
        alert("You can book between 1 and 7 seats at a time.")
        return
      }

      // Find available seats
      const availableSeats = seats
        .map((seat, idx) => ({ ...seat, id: idx }))
        .filter((seat) => seat.status === "available")

      if (availableSeats.length < numSeats) {
        alert("Not enough seats available.")
        return
      }

      // Try to book seats in the same row
      let selectedSeats = []
      for (let r = 0; r < rows; r++) {
        const startIdx = r * seatsPerRow
        const endIdx = r == rows - 1 ? totalSeats : startIdx + seatsPerRow
        const rowSeats = availableSeats.filter(
          (seat) => seat.id >= startIdx && seat.id < endIdx
        )
        if (rowSeats.length >= numSeats) {
          selectedSeats = rowSeats.slice(0, numSeats)
          break
        }
      }

      let Obj = {};
      if (selectedSeats.length == 0) {
        for (let r = 0; r < rows; r++) {
          const startIdx = r * seatsPerRow
          const endIdx = r == rows - 1 ? totalSeats - 1 : startIdx + seatsPerRow
          const rowSeats = availableSeats.filter(
            (seat) => seat.id >= startIdx && seat.id < endIdx
          )
          Obj[`row ${r}`] = {
            rowIndex: r,
            availableTicketsLength: rowSeats.length,
            availableSeatNumbers: rowSeats
          };
        }
        const gettingData = bookSeats(Obj,numSeats)
     
        selectedSeats = gettingData.map(e=>e.availableSeatNumbers).flat()
      }

      

      // If not enough seats in a single row, book nearest seats
      if (selectedSeats.length < numSeats) {
        selectedSeats = availableSeats.slice(0, numSeats)
      }

      // Update the seats state
      const updatedSeats = seats.map((seat, idx) =>
        selectedSeats.some((s) => s?.id === idx)
          ? { status: "booked", user: currentUser }
          : seat
      )

      setSeats(updatedSeats)
      setBookCount("")
    }
  }

  function bookSeats(data, requiredSeats) {
    let bookedRows = []; // Array to hold booked rows and seats
    
    for(let obj in data){
      if(data[obj].availableTicketsLength == 0){
        bookedRows = [];
      }
      if(data[obj].availableTicketsLength != 0 ){
        const sum = bookedRows.reduce((acc, curr) => acc + curr.availableTicketsLength, 0);
        if(sum == requiredSeats){
          return bookedRows;
        }else if(bookedRows.length > 1){
          bookedRows.shift();
        }
        bookedRows.push(data[obj])
      }
    }

    return bookedRows;
}




  
  // Reset all bookings
  const handleReset = () => {
    if (!currentUser) {
      alert("Please login to reset bookings.")
      return
    }

    const updatedSeats = seats.map(() => ({ status: "available", user: null }))
    setSeats(updatedSeats)
    alert("All bookings have been reset.")
  }

  return (
    <div className="bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Ticket Booking</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-[2fr_1fr] gap-8">
          {/* Seats Grid */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="grid grid-cols-7 gap-2">
              {seats.map((seat, idx) => {
                // Skip rendering after 80 seats
                if (idx >= totalSeats) return null
                // Handle last row special case
                if (idx >= totalSeats && idx % seatsPerRow !== 0) {
                  return null
                }
                return (
                  <button
                    key={idx}
                    disabled
                    className={`h-10 rounded-lg text-sm font-medium transition-colors
                      ${seat.status === "available"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-400 text-white"
                      }`}
                  >
                    {idx + 1}
                  </button>
                )
              })}
            </div>

            {/* Booking Status */}
            <div className="mt-6 flex gap-4">
              <div className="rounded-lg bg-yellow-400 px-4 py-2 text-white">
                Booked Seats = {bookedSeatsCount}
              </div>
              <div className="rounded-lg bg-green-500 px-4 py-2 text-white">
                Available Seats = {availableSeatsCount}
              </div>
            </div>
          </div>

          {/* Booking Controls */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Book Seats</h2>
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Number of seats"
                  value={bookCount}
                  onChange={(e) => setBookCount(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  min="1"
                  max="7"
                  onKeyDown={handleBook}
                />
                <button
                  onClick={handleBook}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Book
                </button>
                <button
                  onClick={handleReset}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Reset Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketBookingComponent

