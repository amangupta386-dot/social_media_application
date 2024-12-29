import { toast } from "react-toastify";
import { bookedSeatReset } from "../features/seatBook/seatBookActions";


export const handleReset = async(currentUser, seats, setSeats, dispatch) => {

  if (!currentUser) {
    toast.error(`Please login to reset bookings.`, { position: "bottom-right" });
    return
  }
  try {
   
    const resultAction =  await dispatch(bookedSeatReset());
    if (bookedSeatReset.fulfilled.match(resultAction)) {
      const updatedSeats = seats.map(() => ({ status: "available", user: null }));
      setSeats(updatedSeats); // Reset state only after API success
      toast.success(`All bookings have been reset.`, { position: "bottom-right" });

    } else {
      throw new Error(resultAction.payload || "Failed to reset bookings.");
    }
  } catch (error) {
    toast.error(`Error: ${error.message}`, { position: "bottom-right" });
  }
}