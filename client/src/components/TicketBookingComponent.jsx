'use client'

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { bookSeats } from "../hooks/seatBook"
import { handleLogout } from "../hooks/handleLogout"
import { handleReset } from "../hooks/handleReset"
import { seatBook } from "../features/seatBook/seatBookActions"
import { toast, ToastContainer } from "react-toastify"
import { fetchBookedSeats } from "../hooks/fetchBookedSeats"

const TicketBookingComponent = ({ currentUser }) => {
  const totalSeats = 80
  const seatsPerRow = 7
  const rows = Math.floor(totalSeats / seatsPerRow)
  const [bookCount, setBookCount] = useState("")
  const [seats, setSeats] = useState(
    Array.from({ length: totalSeats }, (_,index) => ({ status: "available", user: null,id : index+1 }))
  )

  const [currentBookedSeat, setCurrentBookedSeat] = useState([]);

  const dispatch = useDispatch()
  const navigate = useNavigate()  
  const {loading, resetLoader} = useSelector((state) => state.seat);

 
  useEffect(()=>{
    fetchBookedSeats(setSeats, dispatch);
  },[])

  // Calculate available and booked seats
  const availableSeatsCount = seats.filter((seat) => seat.status === "available").length
  const bookedSeatsCount = totalSeats - availableSeatsCount

  // Booking logic
  const handleBook = async() => {
    if (!currentUser) {
      toast.error(`Please login to book seats.`, { position: "bottom-right" });
      return
    }

    const numSeats = parseInt(bookCount)
    if (isNaN(numSeats) || numSeats < 1 || numSeats > 7) {
      toast.error(`You can book between 1 and 7 seats at a time`, { position: "bottom-right" });
      return
    }

    // Find available seats
    const availableSeats = seats
      .map((seat, idx) => ({ ...seat, id: idx }))
      .filter((seat) => seat.status === "available")

    if (availableSeats.length < numSeats) {
      toast.error(`Not enough seats available.`, { position: "bottom-right" });
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
      const gettingData = bookSeats(Obj, numSeats)

      selectedSeats = gettingData.map(e => e.availableSeatNumbers).flat()
    }

    // If not enough seats in a single row, book nearest seats
    if (selectedSeats.length < numSeats) {
      selectedSeats = availableSeats.slice(0, numSeats)
    }
    
    // Update the seats state
    const updatedSeats = seats.map((seat, idx) =>
      selectedSeats.some((s) => s?.id === idx)
        ? { status: "booked", user: currentUser, id: seat.id }
        : seat
    )
    debugger
    const updatedSeatsId = selectedSeats.map(e=>e.id);
  
      const resultAction = await dispatch(seatBook({ bookedSeats: updatedSeatsId }));
      if (seatBook.fulfilled().type == resultAction.type) {
        toast.success("Seat Booked successfully!", { position: "bottom-right" });
        setSeats(updatedSeats);
        setCurrentBookedSeat(selectedSeats);
        setBookCount("")
      } 
      else if(seatBook.rejected().type == resultAction.type) {
        toast.error(resultAction.payload, { position: "bottom-right" });
      }
  

  }



  return (
    <div className="bg-gray-50 p-8">
       <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Ticket Booking</h1>
          <button
            onClick={() => {
              handleLogout(navigate, dispatch)
            }}
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
              <div className="grid grid-cols-7 gap-2 mb-4">
              {currentBookedSeat?.map((seat, idx) => {
                return (
                  <button
                    key={idx}
                    disabled
                    className="h-10 rounded-lg text-sm font-medium transition-colors bg-yellow-400 text-white"
                  >
                    {seat.id+1}
                  </button>
                )
              })}
            </div>
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Number of seats"
                  value={bookCount}
                  onChange={(e) => setBookCount(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  min="1"
                  max="7"
                />
                <button
                  onClick={handleBook}
                  disabled={loading}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                {loading ? 'loading...' : 'Book'}

                </button>
                <button
                  onClick={() => {
                    handleReset(currentUser, seats, setSeats, dispatch)
                  }}
                  disabled={resetLoader}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                {resetLoader ? 'loading...' : 'Reset Booking'}
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

