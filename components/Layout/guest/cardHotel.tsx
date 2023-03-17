import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Button, Card, Carousel, Space } from "antd";
import { FcNext, FcPrevious } from "react-icons/fc";
import Link from "next/link";
interface Props {
  text: string;
}

export default function CardHotel() {
  const root = useRouter();

  let card = useSelector((state: any) => state.HotelReducer.hotel);

  //google maps
  let maps = 'https://www.google.com/maps/search/?api=1&query='
  //maps end 

  const submit = (id: any) => {
    root.push({
      pathname: (`/booking/room/`+ id)
    });
  };

  return (
    <div className="w-5/6 justify-center">
    <Carousel slidesToShow={3} dots={true} arrows={true} nextArrow={<FcNext/>} prevArrow={<FcPrevious/>}>
    {card &&
    card?.map((card: any, i: any) => { 
      let arr = card.url;
      let array = arr?.split(",");    
      return (
        <Card className="w-2/6 bg-transparent border-transparent">
          <Card>
            {/* ini gambar */}
            <div className="bg-white">
              <Carousel>
                {array?.map((each: any) => (
                  <img className="w-3/5 rounded-lg" src={each} alt="hotels" />
                ))}
              </Carousel>
            </div>
            <div className="mb-5 flex flex-col gap-3 bg-white">
              {/* badge */}
              <div className="flex justify-between items-center">
                {/* hotle title */}
                <h2 className="font-bold text-lg" title="Best Hotel Ever">
                  {card.hotel_name}
                </h2>
                <span className="flex items-center ">
                  <img
                    className="w-3 h-3 mr-1"
                    src="./img/strar.png"
                    alt="star"
                  />{" "}
                  {card.hotel_rating_star}
                </span>
              </div>
              <div className="h-16">
                <Link href={`${maps}${card.place}`} className="hover:text-rose-500 text-[12px]">
                  {card.place}
                </Link>          
              </div>
              {/* hotel deskrip */}
              <div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium opacity-50 text-justify">
                    {card.hotel_description}
                  </span>
                </div>
              </div>

              {/* contact */}
              <div className="mt-2 flex items-center justify-between">
                <h2 className="text-sm font-medium bottom-0">
                  Contact: {card.hotel_phonenumber}
                </h2>
                <button
                  className="bg-rose-500 inline-block py-2 w-2/5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-rose-600 hover:shadow-lg focus:bg-rose-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-rose-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => submit(card.hotel_id)}
                >
                  D e t a i l
                </button>
              </div>
            </div>
          </Card>
        </Card>
      );
    })
  }
  </Carousel>
  </div>
  )
}
