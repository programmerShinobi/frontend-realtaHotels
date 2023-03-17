import { doAllFaciHotelReq } from '@/redux/Actions/Booking/actionFindFaciAllhotel';
import { doGetHore } from '@/redux/Actions/Booking/actionHore';
import { doCardHotelReq } from '@/redux/Actions/Booking/actionHotel';
import { Button, Modal, Row, Col, Card, Progress, Input, Table, Space, DatePicker, Select, Carousel } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { use, useEffect, useState } from 'react';
import { CgGym } from 'react-icons/cg';
import { IoRestaurantOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs'
import { specialOffersRequest } from '@/redux/Actions/Booking/actionSpecialOffers';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { priceItemsRequest } from '@/redux/Actions/Booking/PriceItems';
import { BsPlus, BsTrash } from 'react-icons/bs'
import { orderDetailRequest } from '@/redux/Actions/Booking/actionOrderDetails';
import { bookingOrderCreate } from '@/redux/Actions/Booking/actionBookingOrder';
import NavBar from '@/components/Header/guest/navbar';
import { FcNext, FcPrevious } from 'react-icons/fc'
import Footer from '@/components/Footer/guest/footer';
import { BiSwim } from 'react-icons/bi';
import PaymentMethod from '@/components/paymentComponents/guest/PaymentMethod';
import { createAccount, fetchUserAccountBy } from '@/redux/Actions/payment/userAccount';
import { boexCreate } from '@/redux/Actions/Booking/actionBoex';
import { MdVerified } from 'react-icons/md';
import { Popover, Text } from '@nextui-org/react';
import { createTransaction } from '@/redux/Actions/payment/transaction';
import Image from 'next/image';


export default function room() {
    const dispatch = useDispatch();
    let root = useRouter();

    const { id } = root.query || {};
    const { roomId, provices, Kids, guest, Sroom, checkIn, checkOut } = root.query || {};

    //google maps
    let maps = 'https://www.google.com/maps/search/?api=1&query='
    //maps end     

    const today = dayjs();
    const tomorrow = today.add(1, 'day');

    let hotel = useSelector((state: any) => state.HotelReducer.hotel);
    let hotel_review = useSelector((state: any) => state.HoreReducer.hore);
    let faci = useSelector((state: any) => state.FaciAllHotelReducer.facihotel);
    let special_offers = useSelector((state: any) => state.SpecialoffersReducer.special_offers);
    let OrderDetails = useSelector((state: any) => state.OrderDetailsReducer.order_details)
    //Price Items 
    let PriceItems = useSelector((state: any) => state.PriceItemsReducer.Price_items)
    const accounts = useSelector((state: any) => state.userAccountReducer.accounts);

    const [modalspof, setModalSpof] = useState(false)
    const [viewAll, setviewAll] = useState(false)
    //Next Page
    const [nextPage, SetNextPage] = useState(false)
    //Cek Token
    const [login, setLogin] = useState(false);

    const [isSaveNewCardSelected, setIsSaveNewCardSelected] = useState(false)
    // The availability of booking button
    const [bookingButtonAvailable, setBookingButtonAvailable] = useState(false)
    // If button clicked, will validate secured key
    const [canPayOrder, setCanPayOrder] = useState(false)
    // Popover message
    const [popOverMessage, setPopOverMessage] = useState("")
    // Proceed order room
    const [proceedBooking, setProceedBooking] = useState(false)

    //check Token
    let token: any;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('token');
            if (token) {
                setLogin(true);
            } else {
                setLogin(false);
            }
        }
    }, []);

    //from localStorage
    let userId: any;
    let userName: any;
    let phone: any;
    let email: any;
    let UserType: any;
    if (typeof window !== 'undefined') {
        userId = localStorage.getItem('userId');
        userName = localStorage.getItem('userFullName');
        phone = localStorage.getItem('PhoneNumber');
        email = localStorage.getItem('Email');
        UserType = localStorage.getItem('UserType') ? localStorage.getItem('UserType') : 'I';
    }


    useEffect(() => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('token');
            if (token) {
                setLogin(true);
            } else {
                setLogin(false);
            }
        }
    }, [userId]);

    useEffect(() => {
        dispatch(doCardHotelReq());
        dispatch(doAllFaciHotelReq());
        dispatch(doGetHore());
        dispatch(specialOffersRequest());
        dispatch(priceItemsRequest());
        dispatch(fetchUserAccountBy({ userId: userId }));
        if (roomId !== undefined) {
            SetNextPage(true);
        }
    }, [id]);

    const [dataBooking, SetdataBooking] = useState({
        boor_user_id: userId,
        boor_hotel_id: id,
        boor_order_number: '',
        boor_order_date: dayjs().format("YYYY-MM-DD"),
        boor_arrival_date: today.format("YYYY-MM-DD"),
        boor_total_room: 1,
        boor_total_guest: 2,
        boor_discount: 0,
        boor_total_tax: 10,
        boor_total_amount: 0,
        boor_down_payment: 0,
        boor_pay_type: '',
        boor_is_paid: 'B',
        boor_type: '',
        boor_cardnumber: 0,
        boor_member_type: 'VIP',
        boor_status: 'BOOKING',
        borde_checkin: today.format("YYYY-MM-DD"),
        borde_Checkout: tomorrow.format("YYYY-MM-DD"),
        borde_adults: 1,
        borde_kids: 1,
        borde_price: 0,
        borde_extra: 0,
        borde_discount: 0,
        borde_tax: 10,
        borde_subtotal: 0,
        borde_faci_id: 0,
        soco_spof_id: 0,
    })

    const [clickedPayNowData, setClickedPayNowData] = useState({
        userId: userId, // add ID
        fullName: "",
        paymentType: "",
        paymentName: "",
        accountNumber: "",
        cardHolderName: "",
        balance: 0,
        expMonth: 0,
        expYear: 0,
        securedKey: ""
    })

    const [transactionData, setTransactionData] = useState<any>({
        userId: userId,
        orderNumber: '', // dari booking order
        amount: 0, // dari booking order
        sourceNumber: 0,
        targetNumber: 0 //tergantung dari user klik payment methodnya apa
    })


    useEffect(() => {
        /**
         * Set transaction data when booking amount and order number data is available.
         * Action: click `Continue To Booking` button.
         */
        setTransactionData({
            ...transactionData,
            orderNumber: dataBooking.boor_order_number, // dari booking order
            amount: dataBooking.boor_total_amount, // dari booking order
        })
    }, [dataBooking.boor_order_number, dataBooking.boor_total_amount])

    //Last OrderBooking
    let O = OrderDetails.length

    //Hotel ById
    let byOne = hotel?.filter((item: any) => item.hotel_id == id);

    //Hotel Facility
    let faciroom = faci?.filter((item: any) => item.hotel_id == id)
    let faci_id = faciroom?.length > 0 ? faciroom[0].faci_id : null;
    let faci_name = faciroom?.length > 0 ? faciroom[0].faci_name : '';
    let faci_low_price = faciroom?.length > 0 ? faciroom[0].faci_rate_price : '';
    let faci_hight_price = faciroom?.length > 0 ? faciroom[0].faci_hight_price : '';

    const [room, setRoom] = useState({
        faci_id: 0,
        faci_name: '',
        faci_hight_price: '',
        faci_low_price: ''
    })

    useEffect(() => {
        setRoom({
            faci_id, faci_name, faci_hight_price, faci_low_price
        });

    }, [faci_low_price]);


    //Hotel Review
    let oneHore = hotel_review?.filter((item: any) => item.hore_hotel_id == id);

    //count Rating
    let rating1 = oneHore.length > 0 ? oneHore?.filter((item: any) => item.hore_rating == 1).length : 0;
    let rating2 = oneHore.length > 0 ? oneHore?.filter((item: any) => item.hore_rating == 2).length : 0;
    let rating3 = oneHore.length > 0 ? oneHore?.filter((item: any) => item.hore_rating == 3).length : 0;
    let rating4 = oneHore.length > 0 ? oneHore?.filter((item: any) => item.hore_rating == 4).length : 0;
    let rating5 = oneHore.length > 0 ? oneHore?.filter((item: any) => item.hore_rating == 5).length : 0;
    let jumlahreview =  oneHore.length
    
    
    let jumlahrating = oneHore.length > 0 ? oneHore?.reduce((acc: any, curr: any) => acc + curr.hore_rating, 0) : 0 ;
    let averageRating =  oneHore.length > 0 ? jumlahrating / jumlahreview :0;
    let rating = averageRating.toFixed(1);
    console.log('rating', rating1,'rrr',jumlahrating  ,'dasd',averageRating,'tt',jumlahreview );

    let ratingClass = '';
    if (Number(rating) >= 4.5) {
        ratingClass = 'Very Good';
    } else if (Number(rating) >= 4) {
        ratingClass = 'Good';
    } else if (Number(rating) >= 3) {
        ratingClass = 'Enough';
    } else if (Number(rating) >= 1){
        ratingClass = 'Bad';
    }else {
        ratingClass = '';
    }
    //end Rating

    //Special Offer
    let spofType = special_offers?.filter((item: any) => item.spofType == UserType);
    let spofDiscount = spofType?.length > 0 ? spofType[0].spofDiscount : '0';
    let spofId = spofType?.length > 0 ? spofType[0].spofId : 0;
    let spoName = spofType?.length > 0 ? spofType[0].spofName : '';

    const [spofName, setSpofName] = useState('')

    //set ke dataBooking
    useEffect(() => {
        SetdataBooking({
            ...dataBooking,
            boor_hotel_id: id,
            boor_discount: parseInt(spofDiscount.substring(2).replace(".", "")),
            borde_discount: parseInt(spofDiscount.substring(2).replace(".", "")),
            soco_spof_id: spofId,
            borde_faci_id: faci_id,
            borde_price: parseInt(faci_low_price.substring(2).replace(".", "")),
            borde_adults: guest ? parseInt(guest as string) : 1,
            boor_total_room: Sroom ? parseInt(Sroom as string) : 1,
            borde_kids: Kids ? parseInt(Kids as string) : 0,
            borde_checkin: dayjs(checkIn as string).format("YYYY-MM-DD"),
            borde_Checkout: checkOut ? dayjs(checkOut as string).format("YYYY-MM-DD") : tomorrow.format("YYYY-MM-DD"),
            boor_arrival_date: dayjs(checkIn as string).format("YYYY-MM-DD"),
            boor_user_id: parseInt(userId),
            boor_type: UserType
        })
        setSpofName(spoName)
    }, [id, spofDiscount, faci_low_price, guest, userId])

    //Remove Special Coupons
    const [removeC, setRemoveC] = useState(false)
    const removeCoupon = () => {
        setSpofName('')
        SetdataBooking({ ...dataBooking, boor_discount: 0, borde_discount: 0 })
        setRemoveC(true)
        setModalSpof(false)
    }


    //select Special offers
    const handleButtonSpof = (index: any) => {
        const selected = spofType[index];
        SetdataBooking({ ...dataBooking, boor_discount: parseInt(selected.spofDiscount.substring(2).replace(".", "")), borde_discount: parseInt(selected.spofDiscount.substring(2).replace(".", "")), soco_spof_id: selected.spofId })
        setSpofName(selected.spofName)
        setModalSpof(false)
        setRemoveC(false)
    };

    //Button Select Room
    const handleButtonClick = (index: any) => {
        const selected = faciroom[index];
        setRoom({ faci_id: selected.faci_id, faci_name: selected.faci_name, faci_hight_price: selected.faci_hight_price, faci_low_price: selected.faci_rate_price });
        SetdataBooking({ ...dataBooking, borde_faci_id: selected.faci_id, borde_price: parseInt(selected.faci_rate_price.substring(2).replace(".", "")) })
    };

    // Modal Price Items
    const [OpenPriceItems, SetOpenPriceItems] = useState(false)
    // Table Item Price
    const columnsItemPrice = [
        {
            title: 'Item Name',
            dataIndex: 'pritName',
        },
        {
            title: 'Price',
            dataIndex: 'pritPrice',
        },
        {
            title: 'Description',
            dataIndex: 'pritDescription',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: any) => (
                <Space size="middle">
                    <button onClick={() => handlesExtra(record.pritId)} className='flex items-center rounded-lg hover:text-[#F33C5D] border hover:border-[#F33C5D] py-1 px-2'>Add</button>
                </Space>
            ),
        },
    ]

    //data Booking Extra
    const [Extra, SetExtra] = useState({
        boexPritId: [] as any[],
        pritName: [] as any[],
        boexPrice: [] as any[],
        boexQty: [] as any[],
        boexSubtotal: [] as any[],
        boexMeasureUnit: [] as any[],
        boexBordeId: [] as any[]
    })

    //Select Boex dari Price Items
    const handlesExtra = (id: any) => {
        const selected = PriceItems.find((item: any) => item.pritId === id);
        const index = Extra.pritName.indexOf(selected.pritName);
        if (index >= 0) {
            const newQty = [...Extra.boexQty];
            newQty[index] += 1;
            const newPrice = [...Extra.boexSubtotal];
            newPrice[index] += parseInt(selected.pritPrice.substring(2).replace(".", ""));
            SetExtra({
                ...Extra,
                boexQty: newQty,
                boexSubtotal: newPrice,
            });
        } else {
            let measureUnit = "";
            if (selected.pritType === "SNACK") {
                measureUnit = "Kg";
            } else if (selected.pritType === "FACILITY") {
                measureUnit = "unit";
            } else if (selected.pritType === "SOFTDRINK") {
                measureUnit = "kg";
            } else if (selected.pritType === "FOOD") {
                measureUnit = "kg";
            } else if (selected.pritType === "SERVICE") {
                measureUnit = "People";
            }
            SetExtra({
                ...Extra,
                boexPritId: [...Extra.boexPritId, selected.pritId],
                pritName: [...Extra.pritName, selected.pritName],
                boexPrice: [...Extra.boexPrice, parseInt(selected.pritPrice.substring(2).replace(".", ""))],
                boexQty: [...Extra.boexQty, 1],
                boexSubtotal: [...Extra.boexSubtotal, parseInt(selected.pritPrice.substring(2).replace(".", ""))],
                boexMeasureUnit: [...Extra.boexMeasureUnit, measureUnit]
            });
        }
        SetOpenPriceItems(false)
    }

    //Total price Item
    const [extraTotal, setExtraTotal] = useState({
        boex_subtotal: 0
    })

    //Hitung subtotal price Items booking Extra
    useEffect(() => {
        const calculPriceEx = () => {
            const SubEx = Extra.boexSubtotal.reduce((a, b) => a + b, 0);
            setExtraTotal({ ...extraTotal, boex_subtotal: SubEx })
        };
        calculPriceEx()
    }, [Extra.boexSubtotal])

    //Menghitung Jumlah Subtotal
    useEffect(() => {
        const lowestPrice = dataBooking.borde_price
        const discount = dataBooking.boor_discount
        const qty = dataBooking.boor_total_room
        const daysQty = dayjs(dataBooking.borde_Checkout).diff(dataBooking.borde_checkin, 'day')
        const totalGuest = dataBooking.borde_adults + dataBooking.borde_kids
        const tot = ((lowestPrice * qty) * daysQty) - discount + extraTotal.boex_subtotal
        const calculatePrice = () => {
            SetdataBooking({ ...dataBooking, boor_total_amount: tot, borde_subtotal: tot, borde_extra: extraTotal.boex_subtotal, boor_arrival_date: dataBooking.borde_checkin, boor_total_guest: totalGuest })
        };
        if (dataBooking.borde_price !== 0 || dataBooking.boor_discount !== 0) {
            calculatePrice()
        }
    }, [dataBooking.borde_price, dataBooking.boor_discount, dataBooking.boor_total_room, extraTotal.boex_subtotal, dataBooking.borde_checkin, dataBooking.borde_Checkout, dataBooking.borde_adults, dataBooking.borde_kids]);


    //Delete item Booking Extra
    const handleDelete = (index: any) => {
        const newId = Extra.boexPritId.filter((boexPritId, i) => i !== index);
        const newPritName = Extra.pritName.filter((name, i) => i !== index);
        const newPritPrice = Extra.boexSubtotal.filter((priceTot, i) => i !== index);
        const newprice = Extra.boexPrice.filter((price, i) => i !== index);
        const newQty = Extra.boexQty.filter((qty, i) => i !== index);
        const mesure = Extra.boexMeasureUnit.filter((measure, i) => i !== index)
        SetExtra({ ...Extra, pritName: newPritName, boexQty: newQty, boexSubtotal: newPritPrice, boexPritId: newId, boexPrice: newprice, boexMeasureUnit: mesure });
    };

    //Table Booking Extra
    const columnBoex = [
        {
            title: 'Item Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'QTY',
            dataIndex: 'boexQty',
            key: 'qty'
        },
        {
            title: 'Price',
            dataIndex: 'boexPrice',
            key: 'price',
        },
        {
            title: 'Total',
            dataIndex: 'boexSubtotal',
            key: 'subtotal'
        },
        {
            title: (
                <div className='flex justify-end'>
                    <button onClick={() => SetOpenPriceItems(true)} className='flex items-center rounded-lg hover:text-[#F33C5D] border hover:border-[#F33C5D] py-1 px-2'><BsPlus />Add</button>
                </div>),
            key: 'action',
            render: (text: any, record: any, index: any) => (
                <div className='flex justify-end'>
                    <button onClick={() => handleDelete(index)}><BsTrash /></button>
                </div>
            ),
        },
    ]



    //map data booking Extra Untuk di masukan Ke table
    const dataBoex = Extra.pritName.map((name: any, index: any) => {
        return {
            key: index,
            name: name,
            boexQty: Extra.boexQty[index],
            boexPrice: Extra.boexPrice[index],
            boexSubtotal: Extra.boexSubtotal[index],
            boexPritId: Extra.boexPritId[index],
            boexMeasureUnit: Extra.boexMeasureUnit[index],
            boexBordeId: Extra.boexBordeId[index]
        };
    });
    const dataBoex1 = Extra.pritName.map((name: any, index: any) => {
        return {
            boexPritId: Extra.boexPritId[index],
            boexPrice: Extra.boexPrice[index],
            boexQty: Extra.boexQty[index],
            boexSubtotal: Extra.boexSubtotal[index],
            boexMeasureUnit: Extra.boexMeasureUnit[index],
            boexBordeId: Extra.boexBordeId[index]
        };
    });


    //check in check out
    const disabledDateStart = (current: any, checkInDate: any) => {
        if (checkInDate) {
            return (
                current < dayjs().startOf('day') ||
                current.isBefore(checkInDate, 'day')
            );
        }
        return current < dayjs().startOf('day');
    };

    const disabledDateEnd = (current: any, checkInDate: any) => {
        if (checkInDate) {
            return (
                current < dayjs().startOf('day') ||
                current.isSame(checkInDate, 'day') ||
                current.isBefore(checkInDate, 'day')
            );
        }
        return current < dayjs().startOf('day');
    };

    useEffect(() => {
        if (dayjs(dataBooking.borde_checkin).isAfter(dataBooking.borde_Checkout, 'day')) {
            SetdataBooking({ ...dataBooking, borde_Checkout: dayjs(dataBooking.borde_checkin).add(1, 'day').format('YYYY-MM-DD') })
        }
    }, [dataBooking.borde_checkin])

    //Input
    const onChangeDataBOOking = (event: any) => {
        const { name, value } = event.target;
        const newValue = name === 'borde_adults' || 'borde_kids' || 'boor_total_room' ? parseInt(value) : value;
        SetdataBooking(Filter => ({ ...Filter, [name]: newValue }));
    };
    const onChangeDate = (event: any) => {
        const { name, value } = event.target;
        SetdataBooking(Filter => ({ ...Filter, [name]: value }))
    }


    useEffect(() => {
        const boorId1 = OrderDetails?.length > 0 ? OrderDetails[0].boor_id : null;
        const boorId = boorId1 + 1
        const newExtra = { ...Extra };
        const dataLength = Extra.pritName.length;
        const boor = () => {
            for (let i = 0; i < dataLength; i++) {
                newExtra.boexBordeId[i] = boorId;
            }
        }
        boor()
        SetExtra({ ...Extra, boexBordeId: newExtra.boexBordeId })
    }, [dataBooking.borde_extra])

    // Button create booking
    const handleButtonBooking = async () => {
        // Create booking transaction when payment method Cash is selected
        if (dataBooking.boor_pay_type == "C") {
            // Create booking order
            dispatch(bookingOrderCreate(dataBooking));
            const next = async () => {
                dispatch(boexCreate(dataBoex1))
            }
            next()
            // Create transaction
            dispatch(createTransaction(transactionData))
            root.push({ pathname: '/booking/room/invois', search: `?id=${dataBooking.boor_order_number}` })
        }

        // If payment type is not cash, check balance
        const isBalanceSufficient = clickedPayNowData.balance >= transactionData.amount;

        /** 
         * Create new account also create transaction when user add new payment method.
         * Will create transaction if not user doesn't save the payment method.
        */
        isSaveNewCardSelected ?
            dispatch(createAccount(clickedPayNowData)) && dispatch(createTransaction(transactionData))
            : (isBalanceSufficient ? setCanPayOrder(true) : setCanPayOrder(false))
    }

    useEffect(() => {
        // If secured key is valid,
        if (proceedBooking) {
            // Close modal
            setCanPayOrder(!canPayOrder)
            // Create booking order
            dispatch(bookingOrderCreate(dataBooking));
            const next = async () => {
                dispatch(boexCreate(dataBoex1))
            }
            next()
            // Create booking transaction
            dispatch(createTransaction(transactionData))
            root.push({ pathname: '/booking/room/invois', search: `?id=${dataBooking.boor_order_number}` })
        }
    }, [proceedBooking])

    //Gambar slider
    let url1 = faciroom?.length > 0 ? faciroom[0]?.fapho_url : '';
    let url2 = faciroom?.length > 0 ? faciroom[1]?.fapho_url : '';
    let url3 = faciroom?.length > 0 ? faciroom[2]?.fapho_url : '';
    const [gambar, setGambar] = useState({
        Gambar1: '',
        Gambar2: '',
        Gambar3: ''
    })

    useEffect(() => {
        setGambar({ ...gambar, Gambar1: url1, Gambar2: url2, Gambar3: url3 })
    }, [url1, url2, url3])

    const ButtonSpof = () => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('token');
            if (token) {
                setModalSpof(true)
            } else {
                root.push('/auth/signin')
            }
        }
    }

    useEffect(() => {
        if (nextPage == true) {
            dispatch(orderDetailRequest());
            if (O == 1) {
                const lastOrderNumber = OrderDetails?.length > 0 ? OrderDetails[0].boor_order_number : null;
                const currentDate = new Date();
                const year = currentDate.getFullYear().toString();
                const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                const day = currentDate.getDate().toString().padStart(2, '0');
                const currentDateString = `${year}${month}${day}`;
                let newOrderNumber;

                if (lastOrderNumber) {
                    const lastOrderDate = lastOrderNumber.slice(3, 11).split('-').reverse().join('');
                    const lastOrderIncrement = parseInt(lastOrderNumber.slice(-4));

                    if (lastOrderDate === currentDateString) {
                        const newOrderIncrement = lastOrderIncrement + 1;
                        const newOrderIncrementString = newOrderIncrement.toString().padStart(4, '0');
                        newOrderNumber = `BO#${currentDateString}-${newOrderIncrementString}`;
                    } else {
                        newOrderNumber = `BO#${currentDateString}-0001`;
                    }
                } else {
                    newOrderNumber = `BO#${currentDateString}-0001`;
                }

                SetdataBooking({
                    ...dataBooking, boor_order_number: newOrderNumber
                });
            }
        }
    }, [nextPage, O])

    const ButtonNextPage = () => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('token');
            if (token) {
                SetNextPage(true)
            } else {
                root.push('/auth/signin')
            }
        }

    }

    return (
        <>
            <NavBar />
            <div className='w-full h-full justify-center'>
                <Row className={`${!nextPage ? 'block flex justify-center' : 'hidden'}`}>
                    <Col span={22} className="flex justify-center ">
                        <div className='w-full'>
                            <Carousel slidesToShow={3} autoplay autoplaySpeed={3000} dots={true} arrows={true} nextArrow={<FcNext />} prevArrow={<FcPrevious />} >
                                { faciroom && faciroom.length > 0 && faciroom?.map((faciroom: any) => {
                                    let urlSlider = faciroom?.fapho_url
                                    console.log('gambar',urlSlider);
                                    let Gambar = urlSlider.split(',')
                                    
                                    console.log('ssds',Gambar,'dfsdfds',Gambar[0]);
                                    
                                    return (
                                
                                                        <div className='w-2/6 border-2'>
                                                        <img width={500} height={100} src={Gambar[0]} alt="gambar1" />
                                                        </div>
                                                
        
                                            )
                                        })}
                                 { faciroom && faciroom.length > 0 && faciroom?.map((faciroom: any) => {
                                    let urlSlider = faciroom?.fapho_url
                                    console.log('gambar',urlSlider);
                                    let Gambar = urlSlider.split(',')
                                    return (
                                
                                                        <div className='w-2/6 border-2'>
                                                        <img width={500} height={100} src={Gambar[1]} alt="gambar1" />
                                                        </div>
                                                
                                
                                            )
                                        })}
                                     { faciroom && faciroom.length > 0 && faciroom?.map((faciroom: any) => {
                                    let urlSlider = faciroom?.fapho_url
                                    console.log('gambar',urlSlider);
                                    let Gambar = urlSlider.split(',')
                                    return (
                                
                                                        <div className='w-2/6 border-2'>
                                                        <img width={500} height={100} src={Gambar[2]} alt="gambar1" />
                                                        </div>
                                                
                                
                                            )
                                        })}
                                </Carousel>
                            </div>
                    </Col>
                </Row>
                <Row gutter={22} className='justify-center flex lg:flex space-x-2 pb-5'>
                    <Col span={14} className={`${!nextPage ? 'block rounded bg-white shadow-lg' : 'hidden'}`}>
                        <div className='flex pt-2 px-2 space-x-5'>
                            <div>
                                <div className='flex space-x-10'>
                                    <div>
                                        {byOne?.length > 0 && (
                                            <h1 className='font-bold text-xl '>{byOne[0]?.hotel_name}</h1>)}
                                        {byOne?.length > 0 && (
                                            <Link href={`${maps}${byOne[0]?.place}`} className='hover:none'>{byOne[0].place}</Link>)}
                                    </div>
                                    <div>
                                        <div className="flex justify-center space-x-3 items-center font-bold rounded bg-white shadow-lg border-2 h-6 w-16">
                                            <h3>{rating}</h3>
                                            <img
                                                className="w-3 h-3 mr-1"
                                                src="../../img/strar.png"
                                                alt="star"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='py-3'>
                                    <h1 className='font-semibold text-sm'>Description</h1>
                                    {byOne?.length > 0 && (
                                        <h2>{byOne[0]?.hotel_description}</h2>
                                    )}
                                </div>
                                <div className='pb-3'>
                                    <h1 className='font-semibold text-sm'>Amenities</h1>
                                    <div className="flex items-center space-x-3 font-semibold py-1">
                                        <div className="flex items-center"><IoRestaurantOutline />Resturant</div>
                                        <div className="flex items-center"><BiSwim />Swimming Pool</div>
                                        <div className="flex items-center"><CgGym />Gym</div>
                                        <div>
                                            <button className="font-bold text-xs pl-4 hover:text-sm"
                                            >
                                                +View More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='rounded shadow-lg text-white bg-[#F33C5D] items-center'>
                                    <h1 className='font-bold text-xl px-3 py-2'>Another Room</h1>
                                </div>
                                <div className='py-2'>
                                    {
                                        faciroom && faciroom.map((faciroom: any, index: any) => {
                                            let gambar = faciroom.fapho_url;
                                            let gambar1 = gambar.split(",");
                                            return (
                                                <div className='flex justify-between space-y-5'>
                                                    <div className='pt-3 pl-4'>
                                                        <div className=''>
                                                            <h1 className='text-[18px] font-bold'>{faciroom.faci_name}</h1>
                                                        </div>
                                                        <div className='flex text-[10px] py-2'>
                                                            <h2>Max Vacant : {faciroom.faci_max_number}</h2>
                                                        </div>
                                                        <div className='flex items-center space-x-3'>
                                                            <h1 className='font-semibold text-[16px]'>{faciroom.faci_rate_price}</h1>
                                                            <h2 className='line-through text-[13px]'>{faciroom.faci_hight_price}</h2>
                                                        </div>
                                                    </div>
                                                    <div className='w-2/6'>
                                                        <div>
                                                            <img src={gambar1[0]} alt="" className='w-5/6 rounded border-2' />
                                                        </div>
                                                        <div className='py-2'>
                                                            <button className='w-5/6 border rounded py-1 hover:border-rose-500 hover:text-rose-500' onClick={() => handleButtonClick(index)}>Select</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className=''>
                                    <h1 className='font-bold text-lg'>Rating & Riviews</h1>
                                    <div>
                                        <div>
                                            <div className='flex justify-between'>
                                                <div className='flex justify-center w-4/6'>
                                                    <div className=' items-center'>
                                                        <div className='flex justify-center'>
                                                            <div className="flex justify-center space-x-3 items-center font-bold rounded bg-[#FDEBEE] shadow-lg border-2 border-[#f33c5d] h-10 w-20">
                                                                <h2 className='text-xl'>{rating}</h2>
                                                                <img
                                                                    className="w-5 h-5"
                                                                    src="../../img/strar.png"
                                                                    alt="star"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h2>
                                                                ({jumlahreview} Ratings) {ratingClass}
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-2/6'>
                                                    <span className='flex items-center w-4/5 space-x-2'>
                                                        <div className='flex items-center pb-2'>
                                                            <h3>5   </h3>
                                                            <img
                                                                className="w-4 h-4"
                                                                src="../../img/strar.png"
                                                                alt="star"
                                                            />
                                                        </div>
                                                        <div className='w-full'>
                                                            <Progress format={() => <span style={{ color: "#000" }}>{Math.round((rating5 / jumlahreview)*100)}%</span>} percent={Math.round((rating5 / jumlahreview) * 100)} />
                                                        </div>
                                                    </span>
                                                    <span className='flex items-center w-4/5 space-x-2'>
                                                        <div className='flex items-center pb-2'>
                                                            <h3>4</h3>
                                                            <img
                                                                className="w-4 h-4"
                                                                src="../../img/strar.png"
                                                                alt="star"
                                                            />
                                                        </div>
                                                        <div className='w-full'>
                                                            <Progress format={() => <span style={{ color: "#000" }}>{Math.round((rating4 / jumlahreview)*100)}%</span>} percent={Math.round((rating4 / jumlahreview) * 100)} />
                                                        </div>
                                                    </span>
                                                    <span className='flex items-center w-4/5 space-x-2'>
                                                        <div className='flex items-center pb-2'>
                                                            <h3>3</h3>
                                                            <img
                                                                className="w-4 h-4"
                                                                src="../../img/strar.png"
                                                                alt="star"
                                                            />
                                                        </div>
                                                        <div className='w-full'>
                                                            <Progress format={() => <span style={{ color: "#000" }}>{oneHore.length > 0 ? Math.round((rating3 / jumlahreview)*100):0}%</span>} percent={oneHore.length > 0 ? Math.round((rating3 / jumlahreview) * 100):0} />
                                                        </div>
                                                    </span>
                                                    <span className='flex items-center w-4/5 space-x-2'>
                                                        <div className='flex items-center pb-2'>
                                                            <h3>2</h3>
                                                            <img
                                                                className="w-4 h-4"
                                                                src="../../img/strar.png"
                                                                alt="star"
                                                            />
                                                        </div>
                                                        <div className='w-full'>
                                                            <Progress format={() => <span style={{ color: "#000" }}>{Math.round((rating2 / jumlahreview)*100)}%</span>} percent={Math.round((rating2 / jumlahreview) * 100)} />
                                                        </div>
                                                    </span>
                                                    <span className='flex items-center w-4/5 space-x-2'>
                                                        <div className='flex items-center pb-2'>
                                                            <h3>1</h3>
                                                            <img
                                                                className="w-4 h-4"
                                                                src="../../img/strar.png"
                                                                alt="star"
                                                            />
                                                        </div>
                                                        <div className='w-full'>
                                                            <Progress format={() => <span style={{ color: "#000" }}>{Math.round((rating1 / jumlahreview)*100)}%</span>} percent={Math.round((rating1 / jumlahreview) * 100)} />
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={`${!viewAll ? "block py-2 h-32" : "hidden"}`}>
                                                <div className='py-1'>
                                                    <div className='flex space-x-3'>
                                                        {oneHore.length > 0 && (
                                                            <h1 className='font-bold'>{oneHore[0].user_full_name}</h1>
                                                        )}
                                                        {oneHore.length > 0 && (
                                                            <h1>{dayjs(oneHore[0].hore_created_on).format('DD MMMM YYYY')}</h1>
                                                        )}
                                                    </div>
                                                    {oneHore.length > 0 && (
                                                        <h1>{oneHore[0].hore_user_review}</h1>
                                                    )}
                                                </div>
                                                <div className='py-3 h-10'>
                                                    <button onClick={() => setviewAll(!viewAll)} className={`${viewAll ? "hidden" : "block flex items-center justify-center font-semibold text-xs hover:text-sm"}`}>+ See All Reviews</button>
                                                </div>
                                            </div>
                                            <div className={`${viewAll ? "block py-2 overflow-y-scroll scrollbar-blue h-32" : "hidden"}`}>
                                                {oneHore && oneHore.map((oneHore: any) => {
                                                    return (
                                                        <div className='py-1'>
                                                            <div className='flex space-x-3'>
                                                                <h1 className='font-bold'>{oneHore.user_full_name}</h1>
                                                                <h2>{dayjs(oneHore.hore_created_on).format('DD MMMM YYYY')}</h2>
                                                            </div>
                                                            <h1>{oneHore.hore_user_review}</h1>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className='py-3 h-10'>
                                                <button onClick={() => setviewAll(!viewAll)} className={`${!viewAll ? "hidden" : "block flex items-center justify-center font-semibold text-xs hover:text-sm"}`}>+ See Less Reviews</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-10'>
                                    <h1 className='font-bold text-lg'>Hotel Policies</h1>
                                    <div>
                                        <p>
                                            "Children under 12 years old stay for free when using existing bedding"<br />
                                            "Cancellations must be made 48 hours prior to arrival to avoid charges"<br />
                                            "Check-in time is at 2:00 PM, early check-in is subject to availability"<br />
                                            "Extra beds are available for an additional charge"<br />
                                            "Smoking is not permitted inside the hotel"<br />
                                            "Pets are not allowed in the hotel"<br />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={14} className={`${nextPage ? "Block rounded bg-white shadow-lg " : "hidden"}`}>
                        <div>
                            <div className='flex space-x-3 items-center'>
                                <button onClick={() => SetNextPage(!nextPage)}><DoubleLeftOutlined /></button>
                                <h1 className='font-bold text-2xl pt-1'>Modify Your Booking</h1>
                            </div>
                            <div className='border-2 bg-[#F33C5D] rounded text-white items-center my-2'>
                                <h1 className='font-bold text-xl py-2 px-4'>1. Enter Your Details</h1>
                            </div>
                            <div className='flex space-x-5 w-5/6 ml-2'>
                                <div className='w-5/6'>
                                    <h2>Full Name</h2>
                                    <input className='border hover:border-rose-500 w-full rounded py-1' value={userName} readOnly placeholder="Enter first and last name" />
                                </div>
                                <div className='w-full'>
                                    <h2>Email</h2>
                                    <input className='border hover:border-rose-500 rounded py-1 w-full' value={email} readOnly placeholder='Email' />
                                </div>
                            </div>
                            <div className='ml-2'>
                                <h2>Mobile Number</h2>
                                <div>
                                    <div className='flex items-center space-x-6'>
                                        <input className='border hover:border-rose-500 rounded py-1 w-1/5' value={phone} readOnly />
                                        <button className='py-2 px-2 border rounded hover:border-rose-500 text-xs hover:text-rose-500'>Send Pascode</button>
                                    </div>
                                </div>
                            </div>
                            <div className='border-2 bg-[#F33C5D] rounded text-white items-center my-2'>
                                <h1 className='font-bold text-xl py-2 px-4'>2. Complete Your Booking</h1>
                            </div>
                            <div>
                                <Modal
                                    open={OpenPriceItems}
                                    onCancel={() => SetOpenPriceItems(false)}
                                    title="Price Items"
                                    width={700}
                                    style={{ top: 10 }}
                                    footer={null}
                                >
                                    <div>
                                        <Table columns={columnsItemPrice} dataSource={PriceItems} pagination={{ pageSize: 5 }} />
                                    </div>
                                </Modal>
                                <div>
                                    <Table columns={columnBoex} dataSource={dataBoex} />
                                </div>
                                <div className='border-1 w-full py-2 flex justify-end space-x-5'>
                                </div>
                            </div>
                            <div className='border-2 bg-[#F33C5D] rounded text-white items-center my-2'>
                                <h1 className='font-bold text-xl py-2 px-4'>3. Payment</h1>
                            </div>
                            {/* CHOOSE PAYMENT METHOD */}
                            <div className='pb-3'>
                                <PaymentMethod
                                    clickedPayNowData={clickedPayNowData}
                                    setClickedPayNowData={setClickedPayNowData}
                                    setProceedBooking={setProceedBooking}
                                    setBookingButtonAvailable={setBookingButtonAvailable}
                                    canPayOrder={canPayOrder}
                                    setCanPayOrder={setCanPayOrder}
                                    setPopOverMessage={setPopOverMessage}
                                    transactionData={transactionData}
                                    setTransactionData={setTransactionData}
                                    setBookingData={SetdataBooking}
                                    bookingData={dataBooking}
                                    userAccounts={accounts}
                                    userId={userId} />
                            </div>
                        </div>
                    </Col>
                    <Col span={8} className='sticky top-0 rounded bg-white shadow-lg justify-center items-center lg:space-y-5 h-4/6'>
                        <div className='pt-2'>
                            <Col span={24} className={`${!login ? 'flex justify-center items-center space-x-3 py-1 rounded bg-slate-50 shadow-lg' : 'hidden'}`}>
                                <h1 className='font-bold py-3'>
                                    Login To See A Lower Price
                                </h1>
                                <Link href={'/auth/signin'}><button className='bg-rose-500 text-white rounded py-1 hover:bg-rose-600  px-4'>Login</button></Link>
                            </Col>
                            <Col span={24} className={`${login ? 'flex justify-center items-center space-x-3 py-1 rounded bg-slate-50 shadow-lg' : 'hidden'}`}>
                                <h1 className='font-bold py-3'>
                                    Booking Order
                                </h1>
                            </Col>
                        </div>
                        <div className='flex justify-center lg:space-x-2'>
                            <div className='w-1/4'>
                                <h2 className='text-xs'>Check-In</h2>
                                <DatePicker
                                    className='h-3/5'
                                    style={{ fontSize: "12px" }}
                                    onChange={(date) => onChangeDate({ target: { name: 'borde_checkin', value: date?.format('YYYY-MM-DD') } })}
                                    value={dayjs(dataBooking.borde_checkin)}
                                    disabledDate={(current) => disabledDateStart(current, dayjs())}
                                    format={'DD/MM/YYYY'}
                                />
                            </div>
                            <div className='w-1/4'>
                                <h2 className='text-xs'>Check-Out</h2>
                                <DatePicker
                                    className='h-3/5'
                                    style={{ fontSize: "12px" }}
                                    placeholder="Check-Out"
                                    onChange={(date) => onChangeDate({ target: { name: 'borde_Checkout', value: date?.format('YYYY-MM-DD') } })}
                                    value={dayjs(dataBooking.borde_Checkout)}
                                    disabledDate={(current) => disabledDateEnd(current, dataBooking.borde_checkin)}
                                    format={'DD/MM/YYYY'}
                                />
                            </div>
                            <div className='w-1/6'><h2 className='text-xs'>Room</h2><Input className='h-3/5 text-xs' type='number' name='boor_total_room' min={1} max={5} value={dataBooking.boor_total_room} onChange={onChangeDataBOOking} /></div>
                            <div className='w-1/6'><h2 className='text-xs'>Kids</h2><Input className='h-3/5 text-xs' type='number' min={0} max={5} value={dataBooking.borde_kids} name='borde_kids' onChange={onChangeDataBOOking} /></div>
                            <div className='w-1/6'><h2 className='text-xs'>Adults</h2><Input className='h-3/5 text-xs' type='number' min={1} max={5} value={dataBooking.borde_adults} name='borde_adults' onChange={onChangeDataBOOking} /></div>
                        </div>
                        <div className='flex justify-center items-center space-x-5'>
                            <h2 className='text-[17px]'>{(dataBooking.borde_price).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</h2>
                            <h2 className='text-xs line-through'>{room.faci_hight_price}</h2>
                        </div>
                        <div className='px-2'>
                            <h2 >Include Tax</h2>
                            <input value={room.faci_name} className='font-bold border-none outline-none focus:ring-0 w-2/5' type="text" readOnly />
                        </div>
                        <Col span={24} className=' flex justify-between items-center space-x-10 py-3 rounded bg-slate-50 shadow-lg'>
                            <button onClick={ButtonSpof} className='font-semibold py-1 px-2 rounded text-[12px] text-white bg-rose-500 hover:bg-rose-600'>
                                Get Coupon
                            </button>
                            <div className=''>
                                <div className='flex space-x-1 items-center'>
                                    <h1 className='text-[14 px] text-rose-500 font-semibold'>{spofName}</h1>
                                    <h1 className='font-semibold'> Coupon</h1>
                                </div>
                                <h1 className='text-[14px] font-bold'>{(dataBooking.borde_discount).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</h1>
                            </div>
                        </Col>
                        <Modal
                            title="More Coupons"
                            open={modalspof}
                            onOk={() => setModalSpof(false)}
                            onCancel={() => setModalSpof(false)}
                            width={600}
                            style={{ top: 20 }}
                            footer={null}
                        >
                            <>
                                <div className={`${!removeC ? 'items center flex justify-between py-4' : 'hidden'}`}>
                                    <div className='flex space-x-2 items-center'>
                                        <h1 className='text-[16px] font-semibold text-rose-500'>{spofName}</h1>
                                        <h1 className='text-[16px]'>{(dataBooking.borde_discount).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</h1>
                                        <div className='flex items-center space-x-1'>
                                            <h1>coupon applied</h1>
                                            <h1 className='text-rose-500'><MdVerified /></h1>
                                        </div>
                                    </div>
                                    <button className='bg-rose-500 hover:bg-rose-600 px-2 rounded' onClick={removeCoupon}>Remove</button>
                                </div>
                                <h1 className='py-2 text-[15px] font-bold ml-2'>Available Coupons</h1>
                                {spofType &&
                                    spofType.map((spofType: any, index: any) => {
                                        let apply;
                                        let avilble;
                                        if (spofType.spofName == spofName) {
                                            apply = 'hidden'
                                            avilble = 'blok'
                                        } else {
                                            apply = 'blok'
                                            avilble = 'hidden'
                                        }
                                        return (
                                            <div className='py-1 border rounded my-2'>
                                                <div className='flex justify-between ml-2'>
                                                    <div className='flex items-center space-x-3'>
                                                        <img className="w-36" src="../../img/logoNav.png" alt="" />
                                                        <h1 className='border rounded border-dashed py-1 px-1 bg-rose-300 border-rose-500 text-[10px] text-white font-semibold'>{spofType.spofName}</h1>
                                                    </div>
                                                    <div className={`${apply} mr-2`}>
                                                        <button className='bg-rose-500 hover:bg-rose-600 px-2 rounded text-white text-[11px] py-1' onClick={() => handleButtonSpof(index)}>Apply</button>
                                                    </div>
                                                    <div className={`${avilble} mr-2`}>
                                                        <button disabled className='bg-rose-300 px-2 rounded text-white text-[11px] py-1'>Applied</button>
                                                    </div>
                                                </div>
                                                <div className='space-y-3 ml-2'>
                                                    <div className='flex space-x-2'>
                                                        <h1 className='font-semibold text-[13px]'>Discount</h1>
                                                        <h1 className='font-bold text-rose-500'>{spofType.spofDiscount}</h1>
                                                    </div>
                                                    <h1 className='text-[12px]'>{spofType.spofDescription}</h1>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </>
                        </Modal>
                        <div className='flex space-x-10 px-2'>
                            <div >
                                <div className={`${nextPage ? 'block' : 'hidden'}`}>Booking Extra</div>
                                <div>Your saving</div>
                                <div>Total Price</div>
                            </div>
                            <div>
                                <div className={`${nextPage ? 'block' : 'hidden'}`}>{(extraTotal.boex_subtotal).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</div>
                                <div>
                                    <h1>- {(dataBooking.boor_discount).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</h1>
                                </div>
                                <div>
                                    <h1>{(dataBooking.boor_total_amount).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</h1>
                                </div>
                            </div>
                        </div>
                        <div className='pb-4'>
                            <button
                                className={`${!nextPage ? 'w-full border rounded py-1 hover:border-rose-500 hover:text-rose-500 pb-2' : 'hidden'}`}
                                onClick={ButtonNextPage}>
                                Continue To Booking
                            </button>
                            <Popover>
                                <Popover.Trigger>
                                    <button
                                        disabled={!bookingButtonAvailable}
                                        className={`${nextPage ? 'w-full bg-rose-500 text-white rounded py-1 hover:bg-rose-600 pb-2' : 'hidden'}`}
                                        onClick={handleButtonBooking}>
                                        Create Booking Order
                                    </button>
                                </Popover.Trigger>
                                <Popover.Content>
                                    <Text> {popOverMessage} </Text>
                                </Popover.Content>
                            </Popover>
                        </div>
                    </Col>
                </Row>
            </div>
            <Footer />
        </>
    )
}