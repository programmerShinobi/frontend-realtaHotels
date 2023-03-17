import { Col, Input, Row, Checkbox, Button, Breadcrumb, Carousel, InputNumber } from "antd";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { doCardHotelReq } from "@/redux/Actions/Booking/actionHotel";
import { IoRestaurantOutline } from 'react-icons/io5';
import { CgGym } from 'react-icons/cg'
import Link from "next/link";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import NavBar from "@/components/Header/guest/navbar";
import { doAllFaciHotelReq } from "@/redux/Actions/Booking/actionFindFaciAllhotel";
import Footer from "@/components/Footer/guest/footer";
import { BiSwim } from "react-icons/bi";
import { min } from "lodash";


export default function Booking(){
    const[view,setview]=useState(false)
    const root = useRouter();
    const dispatch = useDispatch();

    const { provices, guest,Kids, Sroom, checkIn, checkOut } = root.query || {};
        
    const card1 = useSelector((state: any) => state.HotelReducer.hotel);
    const [MapHotel,SetMapHotel]=useState([])
    const [MapHotel2,SetMapHotel2]=useState([])
    
    useEffect(() => {
        dispatch(doAllFaciHotelReq());
        dispatch(doCardHotelReq());
    }, []);
    
    useEffect(() => {
        if (provices !== undefined) {
          let card3 = card1?.filter((items: any) => items.provices.toLowerCase() === provices);
          if (card3.length > 0) {
            SetMapHotel(card3);
            SetMapHotel2(card3);
          } else {
            let card4 = card1?.filter((items: any) => items.city.toLowerCase() === provices);
            SetMapHotel(card4);
            SetMapHotel2(card4);
          }
        } else {
          SetMapHotel(card1);
          SetMapHotel2(card1);
        }
      }, [card1, provices]);
      
    
    let faci = useSelector((state: any) => state.FaciAllHotelReducer.facihotel);

    const [faciRoom,setFaciRoom]=useState([])
    useEffect(()=>{
        setFaciRoom(faci)
    },[faci])
    
    const viewDetail = (id: any) => {
        if(guest !== undefined && Kids !== undefined && Sroom !== undefined && checkIn !== undefined && checkOut !== undefined){
            root.push({pathname:(`/booking/room/`+ id ), 
            search: `?provices=${provices}&guest=${guest}&Kids=${Kids}&Sroom=${Sroom}&checkIn=${checkIn}&checkOut=${checkOut}`})
        }else{
            root.push({pathname:(`/booking/room/`+ id )})
        }
    };

    //Google Maps
    let maps = 'https://www.google.com/maps/search/?api=1&query='

    //Filter
    const [filter,setFilter]=useState({
        minPrice : 0,
        maxPrice : 0
    })

    const handleFilterChange = (event:any) => {
        const { name, value } = event.target;
        setFilter(prevFilter => ({...prevFilter, [name]: value}));
      };
    
    const [checked,setChecked]=useState({
        swpool:false,
        resto:false,
        meet:false,
        Gyb:false,
        Balrooo:false,
        Aula:false
    })

    const clearCB = (e: CheckboxChangeEvent) => {
        setChecked({...checked, swpool:e.target.checked});
      };
    const clearCB2 = (e: CheckboxChangeEvent) => {
        setChecked({...checked, resto:e.target.checked});
      };
    const clearCB3 = (e: CheckboxChangeEvent) => {
        setChecked({...checked, meet:e.target.checked});
      };
    const clearCB4 = (e: CheckboxChangeEvent) => {
        setChecked({...checked, Gyb:e.target.checked});
      };
    const clearCB5 = (e: CheckboxChangeEvent) => {
        setChecked({...checked, Balrooo:e.target.checked});
      };
    const clearCB6 = (e: CheckboxChangeEvent) => {
        setChecked({...checked, Aula:e.target.checked});
      };

    //Button Save Filter
    let card3 = MapHotel?.filter((items:any)=> parseInt((items.faci_lowprice)?.substring(3).replace(".", "")) >= filter.minPrice && parseInt((items.faci_lowprice)?.substring(3).replace(".", "")) <= filter.maxPrice) 
    const SaveFilter = () => {
        SetMapHotel2(card3)
    }

    //Button Clear filter  
    const clearAll = ()=>{
        setFilter({...filter, minPrice:0 ,maxPrice:0})
        setChecked({...checked, swpool:false,resto:false,meet:false,Gyb:false,Balrooo:false,Aula:false});
        SetMapHotel2(MapHotel)
    }
    return(
        <>
        <NavBar/>
        <Head><title>Booking</title></Head>
        <div className="w-full h-full py-2 my-3">
            <Row gutter={22} className="flex justify-center px-2">
                <Col span={7} className="rounded bg-white shadow-lg h-96">
                    <div className="flex justify-between items-center pt-2">
                        <div className="font-bold text-lg">Filter</div>
                        <div><button onClick={clearAll} className="underline text-blue-500 hover:text-base">Clear All</button></div>
                    </div>
                    <div>
                        <h1 className="font-semibold py-2">Price Range</h1>
                        <div className="flex justify-between items-center">
                            <Col span={10}>
                            <Input
                                type="number"
                                placeholder="Min Price"
                                name="minPrice"
                                value={filter.minPrice}
                                onChange={handleFilterChange}
                            />
                            </Col>
                            <h3>Sampai</h3>
                            <Col span={10}>
                            <Input
                                type="number"
                                placeholder="Max Price"
                                name="maxPrice"
                                value={filter.maxPrice}
                                onChange={handleFilterChange}
                            />
                            </Col>
                        </div>
                    </div>
                    <div className="h-3/5">
                        <h1 className="font-semibold py-2">Hotel Facility</h1>
                        <div>
                                <Row className="px-3">
                                    <Col span={20}>
                                        <Checkbox value="Restaurant" checked={checked.resto} onChange={clearCB2}>Restaurant</Checkbox>
                                    </Col>
                                    <Col span={20}>
                                        <Checkbox value="Swimming Pool" checked={checked.swpool} onChange={clearCB}>Swimming Pool</Checkbox>
                                    </Col>
                                    <Col span={20} className={`${view ? "block" : "hidden"}`}>
                                        <Checkbox value="Meeting Room" checked={checked.meet} onChange={clearCB3}>Meeting Room</Checkbox>
                                    </Col>
                                    <Col span={20} className={`${view ? "block" : "hidden"}`}>
                                        <Checkbox value="Gym" checked={checked.Gyb} onChange={clearCB4}>Gym</Checkbox>
                                    </Col>
                                    <Col span={20} className={`${view ? "block" : "hidden"}`}>
                                        <Checkbox value="Balroom" checked={checked.Balrooo} onChange={clearCB5}>Balroom</Checkbox>
                                    </Col>
                                    <Col span={20} className={`${view ? "block" : "hidden"}`}>
                                        <Checkbox value="Aula" checked={checked.Aula} onChange={clearCB6}>Aula</Checkbox>
                                    </Col>
                                </Row>
                            
                        </div>
                        <div className="py-4">
                            <button onClick={()=>setview(!view)} className ={`${view ? "hidden" : "block flex items-center justify-center font-semibold text-xs hover:text-sm"}`}>+ More View</button>
                            <button onClick={()=>setview(!view)} className ={`${view ? "block flex items-center font-semibold text-xs hover:text-sm" : "hidden"}`}>- Lest View</button>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="font-semibold text-xs px-3 py-2 border rounded-lg hover:border-rose-500 hover:text-rose-500" onClick={SaveFilter} >Save Filter</button>
                    </div>
                </Col>
                <Col span={15} className="">
                    <div className="rounded bg-white shadow-lg px-2 py-1">
                          <div>
                            <Breadcrumb separator=">">
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                    <a href="">Hotel</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                    <a href="">{provices}</a>
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                          </div>
                        <div className='items-center'>
                                {
                                    MapHotel2 &&
                                    MapHotel2.map((card: any) => {
                                    let arr = card.url;
                                    let array = arr?.split(",");
                                    let hotel_id = card.hotel_id
                                    let faciroom: any = faciRoom?.filter((item:any)=> item.hotel_id == hotel_id) 
                                    let disH = parseInt((faciroom[0]?.faci_hight_price)?.substring(2).replace(".", ""))
                                    let disL = parseInt((faciroom[0]?.faci_rate_price)?.substring(2).replace(".", ""))
                                    let Discount = Math.round((disH-disL)/disH * 100)
                                    let bookingNow = (id:any)=>{
                                        if (typeof window !== 'undefined') {
                                            let token = localStorage.getItem('token');
                                            if (token){
                                                if(guest !== undefined && Kids !== undefined && Sroom !== undefined && checkIn !== undefined && checkOut !== undefined){
                                                    root.push({pathname:(`/booking/room/`+ id ), 
                                                    search: `?roomId=${faciroom[0]?.faci_id}&provices=${provices}&guest=${guest}&Kids=${Kids}&Sroom=${Sroom}&checkIn=${checkIn}&checkOut=${checkOut}`})
                                                }else{
                                                    root.push({pathname:(`/booking/room/`+ id )})
                                                }
                                            }else{
                                                root.push('/auth/signin')
                                            }
                                        }
                                    }                                        
                                    return (
                                        <div className="py-2 items-center flex">
                                            <div className="card w-2/6 p-1 flex items-center">
                                            {/* ini gambar */}
                                                <div className="w-5/6 p-2">
                                                    <Carousel autoplay autoplaySpeed={4000}>
                                                    {array?.slice(0, 4).map((each: any) => (
                                                        <img className="w-full" src={each} alt="hotels" />
                                                    ))}
                                                    </Carousel>
                                                </div>
                                                <div>
                                                    {array?.slice(0, 4).map((image: any, index: any) => (
                                                        <img key={index} src={image} className="w-14 py-1" />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="pl-2">
                                                <h2 className="text-[20px] font-bold" title="Best Hotel Ever">
                                                    {card.hotel_name}
                                                </h2>
                                                <span className=" font-reguler font-reguler text-sm">
                                                    <Link className="hover:none" href={`${maps}${card.place}`} > {card.place} </Link>
                                                </span>
                                                <span className="flex items-center ">
                                                    <img
                                                    className="w-3 h-3 mr-1"
                                                    src="./img/strar.png"
                                                    alt="star"
                                                    />{" "}
                                                    {card.hotel_rating_star}
                                                </span>
                                                <div className="flex items-center space-x-3 font-semibold py-1">
                                                    <div className="flex items-center"><IoRestaurantOutline/>Resturant</div>
                                                    <div className="flex items-center"><BiSwim/>Swimming Pool</div>
                                                    <div className="flex items-center"><CgGym/>Gym</div>
                                                    <div>
                                                        <button className="font-bold text-xs pl-4 hover:text-sm" 
                                                        onClick={()=>viewDetail(card.hotel_id)}
                                                        >
                                                            +View More
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2 className="font-semibold text-sm">{faciroom[0]?.faci_name}</h2>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <div>
                                                        <div className="flex items-center space-x-3">
                                                            <h2>{faciroom[0]?.faci_rate_price}</h2>
                                                            <h2 className="line-through">{faciroom[0]?.faci_hight_price}</h2>
                                                            <h2>{(Discount)}% off</h2>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xs font-semibold">Per Room Per Night</h3>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <button className="font-semibold text-sm px-3 py-2 border rounded-lg hover:border-rose-500 hover:text-rose-500" onClick={()=>viewDetail(card.hotel_id)}>View Details</button>
                                                        <button className="font-semibold shadow-lg text-sm px-3 py-2 border text-white bg-rose-500 rounded-lg hover:border-rose-500 hover:text-rose-800" onClick={()=>bookingNow(card.hotel_id)} >Booking Now</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                    })
                                }
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        <Footer/>   
        </>
    )
} 