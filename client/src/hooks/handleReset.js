export const handleReset = (currentUser, seats, setSeats) => {
    if (!currentUser) {
      alert("Please login to reset bookings.")
      return
    }

    const updatedSeats = seats?.map(() => ({ status: "available", user: null }))
    setSeats(updatedSeats)
    alert("All bookings have been reset.")
  }