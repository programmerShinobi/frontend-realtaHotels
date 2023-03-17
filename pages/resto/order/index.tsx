import Header from "@/components/Header/guest/index";
import index from "@/pages/admin/hotels/hotel";
import { orderDetailRequest } from "@/redux/Actions/Booking/actionOrderDetails";
import { doCreateOrderMenus, doCreateOrderMenusDetail, doOrderMenusDetailRequest, doOrderMenusRequest, orderMenusIdAkhirRequest, orderMenusOneAkhirRequest } from "@/redux/Actions/Resto/reduceActions";
import { doUsersRequest } from "@/redux/Actions/users/reduceActions";
import { count } from "console";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { number } from "yup";

export default function OrderMenu() {
  const router = useRouter();
  const { id } = router.query || {};

  // const userFullName: any = localStorage.getItem("userFullName");
  const dispatch = useDispatch();

  const [Keranjang, setKeranjang] = useState([]);
  // console.log("ini keranjang", Keranjang);

  const ormeIds = Keranjang.map((item: any) => item.reme_id);

  // console.log("ss", idArray);

  console.log("id menus", ormeIds);
  console.log("id", id);

  const [userFullName, setUserFullName]: any = useState("");
  const [profileEmail, setProfileEmail]: any = useState("");
  const [roleId, setRoleId]: any = useState("");

  // const [create]

  useEffect(() => {
    setUserFullName(localStorage.getItem("userFullName"));
    setProfileEmail(localStorage.getItem("Email"));
    setRoleId(localStorage.getItem("roleId"));
  });

  // console.log("ID", roleId);
  // console.log(roleId);

  useEffect(() => {
    const { Keranjang }: any = router.query;

    if (Keranjang) {
      setKeranjang(JSON.parse(Keranjang));
    }
  }, [router.query]);

  const totalHarga = Keranjang.reduce((total: number, item: any) => {
    return total + item.total;
  }, 0);

  // Menjumlahkan QTY dari item yang d keranjang :
  const totalQuantity = Keranjang.reduce((total: number, item: any) => total + item.reme_quantity, 0);

  // Menjumlahkan banyak item d keranjang
  const totalItem = Keranjang.length;

  const totalKeseluruhan = () => {
    return totalHarga + (totalHarga * 15) / 100 - 5000;
  };

  // Memasukan total Amount
  const totalAmount = totalKeseluruhan();

  // Mengambil valu paytype
  const handlePayTypeChange = (event: any) => {
    setOrderMenus((prevOrderMenus: any) => ({
      ...prevOrderMenus,
      ormePayType: event.target.value,
    }));
  };

  //Card number baru
  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cardNumber = event.target.value.replace(/[^0-9-]/g, "");
    setOrderMenus((prevOrderMenus: any) => ({
      ...prevOrderMenus,
      ormeCardnumber: cardNumber,
    }));
  };

  //Mengisi orme Price
  const ormePricee = totalKeseluruhan();

  // Mengisi orme subtotal
  const subTotal = totalHarga;

  const [Data, setData] = useState([]);

  const [DataDetail, setDetail] = useState([]);
  const [idAkhir, setIdAkhir] = useState([]);

  let orderAKhirData = useSelector((state: any) => state.orderMenusAkhirReducers.orderMenusAkhir);
  let IdAkhirOrderMenus1 = useSelector((state: any) => state.orderMenusIdAkhirReducers.orderMenusIdAkhir);

  useEffect(() => {
    dispatch(orderMenusIdAkhirRequest());
  }, []);

  useEffect(() => {
    if (IdAkhirOrderMenus1) {
      setIdAkhir(IdAkhirOrderMenus1);
    }
  }, [IdAkhirOrderMenus1]);

  const ormeId = idAkhir[0]?.orme_id;

  useEffect(() => {
    dispatch(orderMenusOneAkhirRequest());
  }, []);

  useEffect(() => {
    if (orderAKhirData) {
      setData(orderAKhirData);
    }
  });

  const [orderMenus, setOrderMenus]: any = useState([]);
  console.log(orderMenus);

  console.log("OrderMenus", orderMenus);

  // console.log("OrderMenu", orderMenus);

  console.log("INI DATA", Data);
  //buat order number

  const handleSubmit = async () => {
    const today = new Date();
    const year = today.getFullYear().toString(); // Mendapatkan tahun saat ini dan mengonversinya menjadi string (contoh: "2023")
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Mendapatkan bulan saat ini dan mengonversinya menjadi string, tambah 1 karena dimulai dari 0 (contoh: "3")
    const date = today.getDate().toString(); // Mendapatkan tanggal saat ini dan mengonversinya menjadi string (contoh: "10")
    const formattedDate = date + month + year;
    const orderNumber = `MENUS#${formattedDate}-${ormeId + 1}`;
    let newOrderNumber = orderNumber;

    let dataInsert = [];

    for (const i of ormeIds) {
      let dt = {
        ormeOrderNumber: newOrderNumber,
        ormeOrderDate: dayjs().format("YYYY-MM-DD"),
        ormeQty: totalQuantity,
        ormeTotalDiscount: "5000",
        ormePayType: orderMenus.ormePayType,
        ormeIsPaid: "B",
        ormeCardnumber: orderMenus.ormeCardnumber,
        ormeTotalItem: totalItem,
        ormeTotalAmount: totalAmount,

        ormeDiscount: "5000",
        ormePrice: ormePricee,
        ormeSubtotal: subTotal,
        ormeUser: roleId,
        omdeOrme: ormeId,
        omdeReme: i,
      };
      dataInsert.push(dt);
    }
    setOrderMenus(dataInsert);

    if (dataInsert.length !== 0) {
      dataInsert.map((e: any) => {
        // alert(JSON.stringify(e));
        dispatch(doCreateOrderMenus(e));
        dispatch(doCreateOrderMenusDetail(e));
      });
      router.push({ pathname: `./bill`, query: { Keranjang:JSON.stringify(Keranjang)}});
    }
  };

  return (
    <div>
      <Header></Header>
      <div className=' flex justify-center'>
        <title>Resto Order</title>
        <div className='mt-8 flex justify-between'>
          {/* <!--Konten Kiri --> */}
          <div>
            {/* <!--Back & Complate Your Order --> */}
            <div>
              <div className='flex items-center'>
                {/* <!--Back --> */}
                <div className='h-[26px]'>
                  <Link href='./menus' className='w-full'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 26 26' stroke-width='2.5' stroke='currentColor' className='w-7'>
                      <path stroke-linecap='round' stroke-linejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                    </svg>
                  </Link>
                </div>
                {/* <!--Complate your Order --> */}
                <div className='ml-4'>
                  <p className='text-lg font-semibold'>Complate Your Order</p>
                </div>
              </div>
            </div>
            {/* <!-- Card Your Detail --> */}
            <div className='card-cart mt-6 p-6 h-auto w-[750px] '>
              <p className='text-lg font-semibold text-gray-700 '>1. Enter Your Order</p>
              <div className='mt-3 flex items-center'>
                <div className='text-[#F33C5D]'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='h-4 w-4'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z' />
                  </svg>
                </div>
                <div className='ml-2 text-xs text-[#F33C5D] '>We will use these details to share your booking information</div>
              </div>
              <div className='mt-6 flex gap-5'>
                <div className='w-[350px]'>
                  <label className='mb-3 block text-sm font-semibold text-gray-600'>Full Name</label>
                  <input className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-500 ' id='fullname' type='text' value={userFullName} disabled />
                </div>
                <div className='w-[350px]'>
                  <label className='mb-3 block text-sm font-semibold text-gray-600'>Email</label>
                  <input className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-500  ' id='fullname' type='email' value={profileEmail} disabled />
                </div>
              </div>
            </div>
            <div className='card-cart mt-4  w-[750px] p-8 '>
              <p className='text-lg font-semibold text-gray-700'>2. Payment</p>
              <div className='mt-3 flex items-center'>
                <div className='text-[#F33C5D]'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='h-4 w-4'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z' />
                  </svg>
                </div>
                <div className='ml-3 text-xs text-[#F33C5D]'>please complate appropriate your data</div>
              </div>
              <div className='mt-6 flex gap-5'>
                <div className='w-[350px]'>
                  <label htmlFor='pay-type' className='mb-3 block text-sm font-semibold text-gray-600'>
                    Payment Type
                  </label>
                  <select id='pay-type' value={orderMenus.ormePayType} onChange={handlePayTypeChange} className='block w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-500 focus:outline-gray-400 '>
                    <option>pay at hotel</option>
                    <option value='CR'> credit card </option>
                    <option value='C'>cash</option>
                    <option value='D'>debet</option>
                    <option value='PG'>payment gateway</option>
                    <option value='BO'>bill checkout</option>
                  </select>
                </div>
                <div className='w-[350px]'>
                  <label className='mb-3 block text-sm font-semibold text-gray-600'>Account Payment</label>
                  <input
                    value={orderMenus.ormeCardnumber}
                    onChange={handleCardNumberChange}
                    onKeyPress={(event) => {
                      const charCode = event.which ? event.which : event.keyCode;
                      if (charCode !== 45 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                        event.preventDefault();
                      }
                    }}
                    className=' w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700  focus:outline-gray-400'
                    id='fullname'
                    type='text'
                    placeholder='enter your account payment'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <!--Konten Kanan --> */}
          <div className='mt-9'>
            <div className='card-cart h-auto w-[350px] m-4 '>
              <div className='flex items-center justify-center'>
                <div>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='h-6 w-6 text-gray-700'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z'
                    />
                  </svg>
                </div>
                <div className='ml-3 text-lg font-semibold text-gray-700'>Items Ordered</div>
              </div>
              <div className='mt-3 border-t-2 border-gray-300'></div>
              {/* <!-- Isi --> */}
              <div>
                <div>
                  {Keranjang.map((item: any, index: any) => (
                    <div key={index}>
                      <h1 className='mt-3 text-lg font-semibold text-gray-700 '>{item.reme_name}</h1>
                      <div className='flex justify-between'>
                        <div>
                          <h1 className='mt-3 text-sm font-semibold text-gray-500'>
                            {item.reme_price} x {item.reme_quantity}
                          </h1>
                        </div>
                        <div>
                          <h1 className='mt-3 text-sm font-semibold text-gray-500 '>Rp.{item.total}</h1>
                        </div>
                      </div>
                      <div className='mt-3 border-t-2 border-gray-100'></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* <!-- subTOtal --> */}

              <div className='flex justify-between mt-6'>
                <div>
                  <h1 className='text-base font-semibold text-gray-600'>Subtotal :</h1>
                </div>
                <div>
                  <h1 className='text-base font-semibold text-gray-600'>Rp.{totalHarga}</h1>
                </div>
              </div>
              <div className='flex justify-between pt-3'>
                <div>
                  <h1 className='text-base font-semibold text-gray-600'>Discount :</h1>
                </div>
                <div>
                  <h1 className='text-base font-semibold text-gray-600'>Rp.5.000</h1>
                </div>
              </div>
              <div className='flex justify-between pt-3'>
                <div>
                  <h1 className='text-base font-medium text-gray-600'>Tax :</h1>
                </div>
                <div>
                  <h1 className='text-base font-semibold text-gray-600'>15%</h1>
                </div>
              </div>
              <div className='mt-3 border-t-2 border-gray-300'></div>
              <div className='flex justify-between pt-4'>
                <div>
                  <h1 className='text-xl font-semibold text-gray-600'>Total :</h1>
                </div>
                <div>
                  <h1 className='text-xl font-semibold text-gray-600 '>Rp.{totalKeseluruhan()}</h1>
                </div>
              </div>
              <div className='w-full pt-6'>
                <div>
                  <button className='h-10 w-full text-[#F33C5D] hover:text-white border border-[#F33C5D] hover:bg-[#F33C5D] focus:ring-4 focus:outline-none focus:ring-white font-medium rounded text-sm  text-center mr-2 mb-2 dark:border-[#F33C5D] dark:text-[#F33C5D] dark:hover:text-white dark:hover:bg-[#F33C5D] dark:focus:ring-[#F33C5D]"'>
                    Get Coupons
                  </button>
                </div>
                <div className='pt-1'>
                  <button onClick={handleSubmit} className='h-10 w-full bg-[#F33C5D] text-white font-semibold rounded'>
                    Complate Your Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
