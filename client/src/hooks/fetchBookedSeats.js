import { toast } from "react-toastify";
import { getSeats } from "../features/seatBook/seatBookActions";

export const fetchBookedSeats = async(setSeats, dispatch)=>{
  
      const resultAction = await dispatch(getSeats());
      if (getSeats.fulfilled().type == resultAction.type) {        
        setSeats((prevSeats) =>
          prevSeats.map((item) => ({
            ...item,
            status: resultAction.payload.seat.bookedSeats.some((e) => e === item.id)
              ? "booked"
              : "available",
          }))
        );

      } else if(getSeats.rejected().type == resultAction.type) {
        toast.error(`Failed to Fetch Tickets Numbers`, { position: "bottom-right" });
      }
    
  }