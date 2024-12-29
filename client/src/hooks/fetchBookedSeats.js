import { toast } from "react-toastify";
import { getSeats } from "../features/seatBook/seatBookActions";

export const fetchBookedSeats = async(setSeats, dispatch)=>{
    try {
      const resultAction = await dispatch(getSeats());
      if (getSeats.fulfilled.match(resultAction)) {        
        setSeats((prevSeats) =>
          prevSeats.map((item) => ({
            ...item,
            status: resultAction.payload.seat.bookedSeats.some((e) => e === item.id)
              ? "booked"
              : "available",
          }))
        );
        
        // setSeats(updatedSeats);
        // setBookCount("")
      } else {
        throw new Error(resultAction.payload || "Failed to Seat bookings.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, { position: "top-right" });
    }
  }