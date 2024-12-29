export const bookSeats = (data, requiredSeats) => {
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