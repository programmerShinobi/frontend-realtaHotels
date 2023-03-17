import { Carousel } from "antd";
import React from "react";
//These are Third party packages for smooth slideshow

const Slideshow = () => {
  //Array of Images
  const images = [
    "./img/Frame 15.png",
    "./img/Frame 16.png",
    "./img/Frame 17.png",
    "./img/Frame 18.png",
    "./img/Frame 19.png",
  ];

  return (
    <div className="relative w-full flex justify-center">
      <div className="w-5/6 max-w-screen">
        <Carousel autoplay autoplaySpeed={5000} dots={true} arrows={true} >
          <div className=''>
              <img src="./img/Frame 15.png" alt="frame-1" />
          </div>
          <div className=''>
              <img src="./img/Frame 16.png" alt="frame-2" />
          </div>
          <div className=''>
              <img src="./img/Frame 17.png" alt="frame-3" />
          </div>
          <div className=''>
              <img src="./img/Frame 18.png" alt="frame-4" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Slideshow;
