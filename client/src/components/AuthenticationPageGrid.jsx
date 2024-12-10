import React from 'react'

function AuthenticationPageGrid() {

    const images = [
        "/images/image1.png",
        "/images/image2.png",
        "/images/image4.png",
        "/images/image5.png",
        "/images/image8.png",
        "/images/image3.png",
        "/images/image6.png",
        "/images/image7.png",
        "/images/image8.png",
        "/images/image9.png"
      ];
  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {images.map((image, index) => (
        <div
          key={index}
          className={`relative overflow-hidden 
              ${index % 2 === 0 ? "row-span-3" : ""}
              ${index === 4 ? "h-72" : "h-full"}`}
        >
          <img
            src={image}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  )
}

export default AuthenticationPageGrid