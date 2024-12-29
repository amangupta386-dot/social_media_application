import { toast } from "react-toastify";
import { getSeats } from "../features/seatBook/seatBookActions";

export const fetchBookedSeats = async(setSeats, dispatch)=>{
  
      const resultAction = await dispatch(getSeats());
      if (getSeats.fulfilled().type == resultAction.type) {    
           
        setSeats((prevSeats) =>
          prevSeats.map((item) => ({
            ...item,
            status: resultAction.payload.bookedSeats.some((e) => e === item.id)
              ? "booked"
              : "available",
          }))
        );

      } else if(getSeats.rejected().type == resultAction.type) {
        toast.error(resultAction.payload, { position: "bottom-right" });
      }
    
  }