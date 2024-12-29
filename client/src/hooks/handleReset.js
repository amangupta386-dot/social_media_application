import { toast } from "react-toastify";
import { bookedSeatReset } from "../features/seatBook/seatBookActions";


export const handleReset = async(currentUser, seats, setSeats, dispatch) => {

  if (!currentUser) {
    alert("Please login to reset bookings.")
    return
  }
  try {
   
    const resultAction =  await dispatch(bookedSeatReset());
    if (bookedSeatReset.fulfilled.match(resultAction)) {
      toast.success("Bookings reset successfully!", { position: "top-right" });
      const updatedSeats = seats.map(() => ({ status: "available", user: null }));
      setSeats(updatedSeats); // Reset state only after API success
      alert("All bookings have been reset.")

    } else {
      throw new Error(resultAction.payload || "Failed to reset bookings.");
    }
  } catch (error) {
    toast.error(`Error: ${error.message}`, { position: "top-right" });
  }
}