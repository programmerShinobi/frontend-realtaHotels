import { doCardClientRequest, restoMenusPhotosUrlRequest } from "@/redux/Actions/Resto/reduceActions";
import { Modal, Alert, Space, Carousel, message, Image } from "antd";
import Header from "@/components/Header/guest/index";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CardRestoMenusClient() {
  const [Keranjang, setKeranjang]: any = useState([]);

  const tambahKeranjang = (cart: any) => {
    // Cek apakah item sudah ada di dalam keranjang
    const existingCartItem = Keranjang.find((item: any) => item.reme_name === cart.reme_name);

    if (existingCartItem) {
      // Jika item sudah ada, tambahkan kuantitasnya dan perbarui jumlah totalnya
      setKeranjang(
        Keranjang.map((item: any) =>
          item.reme_name === cart.reme_name
            ? {
                ...item,
                reme_quantity: item.reme_quantity + 1,
                // rem: item.reme_quantity + cart.reme_quantity,
                total: parseInt(item.reme_price.split(",")[0].replace(/[^0-9]/g, "")) * (item.reme_quantity + 1),
              }
            : item
        )
      );
    } else {
      // Jika item belum ada, tambahkan ke dalam keranjang
      setKeranjang([
        ...Keranjang,
        {
          ...cart,
          total: parseInt(cart.reme_price.split(",")[0].replace(/[^0-9]/g, "")),
        },
      ]);
    }
  };

  const totalHarga = Keranjang.reduce((total: number, item: any) => {
    return total + item.total;
  }, 0);

  const totalKeseluruhan = () => {
    return totalHarga + (totalHarga * 15) / 100;
  };

  const hapusKeranjang = (index: number) => {
    const newKeranjang = [...Keranjang];
    newKeranjang.splice(index, 1); // Menghapus 1 nilai dari array pada index tertentu
    setKeranjang(newKeranjang);
  };
  

  const [Data, setData]: any = useState([]);

  const restoMenusCard = useSelector((state: any) => state.restoCardClientReducers.restoCardClient);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doCardClientRequest());
  }, [Data]);

  useEffect(() => {
    if (restoMenusCard && restoMenusCard.results) {
      setData(restoMenusCard.results);
    }
  });

  const [userFullName, setUserFullName]: any = useState("");
  const [profileEmail, setProfileEmail]: any = useState("");

  useEffect(() => {
    setUserFullName(localStorage.getItem("userFullName"));
    setProfileEmail(localStorage.getItem("Email"));
  });

  //alert
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const router = useRouter();

  const handleClick = () => {
    if (Keranjang == 0) {
      return message.error("Keranjang masih kosong!", 2);
    } else {
      window.setTimeout(() => {
        setModalIsOpen(true);
        window.setTimeout(() => {
          setModalIsOpen(false);
          router.push({
            pathname: "./order",
            query: { Keranjang: JSON.stringify(Keranjang) },
          });
        }, 2000);
      }, 0);
    }
  };

  const handleCreateOrder = (event: any) => {
    event.preventDefault(); // mencegah beralih ke halaman baru
    // Lakukan logika untuk membuat pesanan di sinin
    handleClick(); // tampilkan modal
  };

  // src={CardResto.remp_url}

  //search and search
  const [sortType, setSortType] = useState("lowToHigh");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAndSortedData = Data.filter((item: any) => item.reme_name && item.reme_name.toLowerCase().includes(searchQuery.toLowerCase())).sort((a: any, b: any) => {
    const priceA = parseInt(a.reme_price.split(",")[0].replace(/[^0-9]/g, ""));
    const priceB = parseInt(b.reme_price.split(",")[0].replace(/[^0-9]/g, ""));

    if (sortType === "lowToHigh") {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });

  // console.log(filteredAndSortedData);

  // FOTO SLIDER

  const contentStyle: React.CSSProperties = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <div>
      <Header></Header>
      <main className='mb-[60px]'>
        <title>Resto Menus</title>
        <div className='flex justify-center gap-[528px] mt-5 items-center'>
          <div>
            <div>
              <div className='relative inline-block'>
                <select onChange={(e) => setSortType(e.target.value)} className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded  leading-tight focus:outline-none '>
                  <option value='lowToHigh'>Price Low to High</option>
                  <option value='highToLow'>Price High to Low</option>
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                  <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                    <path d='M10 12l-5-5 1.41-1.41L10 9.18l3.59-3.59L15 7l-5 5z' />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center ml-5'>
            <div>
              <h1>Cari Makanan anda : </h1>
            </div>
            <div className='input-group relative mt-3 ml-3 mb-2 flex w-60 flex-wrap items-stretch'>
              <input
                type='search'
                className='form-control relative m-0 block w-full min-w-0 flex-auto  border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-gray-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                placeholder='Search Menus'
                aria-label='Search'
                aria-describedby='button-addon2'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <div>
            {/* <!-- Main ---> */}
            <div className='flex gap-10 mt-5'>
              {/* <!-- Konten Menu ---> */}
              <div className='grid h-auto w-auto  grid-cols-3 gap-1'>
                {/* batas */}
                {filteredAndSortedData.map((CardResto: any) => {
                  return (
                    <div className='card h-auto w-[240px]'>
                      {/* <!--Image--> */}
                      <Carousel autoplay>
                        <div>
                          <div style={contentStyle}>
                            <Image className='h-48 w-56 object-cover' src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' />
                          </div>
                        </div>
                      </Carousel>
                      <div>
                        <h1 className='mt-3 text-xl font-bold text-gray-700'>{CardResto.reme_name}</h1>
                        <h1 className='mt-2.5 text-base overflow-auto h-[78px] text-gray-700 hide-scrollbar scrollbar-thumb-red-500  '>{CardResto.reme_description}</h1>
                        <h1 className={`mt-3 text-base font-semibold ${CardResto.reme_status === "available" ? "text-green-500" : "text-red-500"}`}>{CardResto.reme_status}</h1>
                        <div className='flex items-baseline justify-between'>
                          <div>
                            <h1 className='mt-3 text-lg font-semibold'>{CardResto.reme_price}</h1>
                          </div>
                          <div>
                            <h1 className='font-base text-xs text-gray-700'>Include Tax</h1>
                          </div>
                        </div>
                        <div className='w-full pt-4'>
                          <button
                            className={` rounded h-10 w-full font-reguler  text-white ${CardResto.reme_status === "empty" ? "bg-gray-300 cursor-not-allowed" : "bg-[#F33C5D]"}`}
                            onClick={() => tambahKeranjang(CardResto)}
                            disabled={CardResto.reme_status === "empty"}
                          >
                            ADD TO CART
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* <!-- Cart ---> */}
              <div className='card-cart mt-2 h-full w-[350px]'>
                <div className='flex items-center justify-center'>
                  <div>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='h-6 w-6'>
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z'
                      />
                    </svg>
                  </div>
                  <div className='ml-3 text-lg font-semibold'>Items Ordered</div>
                </div>
                <div className='mt-3 border-t-2 border-gray-200'></div>
                {/* <!-- Isi --> */}
                {Keranjang.map((nampilinKeranjang: any, index: number) => {
                  return (
                    <div>
                      <div key={index} className='flex items-center justify-between'>
                        <div>
                          <h1 className='mt-3 text-lg font-semibold text-gray-700'>{nampilinKeranjang.reme_name}</h1>
                          {/* <!-- Harga --> */}
                          <h1 className='mt-1 text-sm font-semibold text-gray-500'>
                            {/* {parseInt(nampilinKeranjang.reme_price.split(",")[0].replace(/[^0-9]/g, ""))} x {nampilinKeranjang.reme_quantity} = Rp.{nampilinKeranjang.total} */}
                            Rp.{parseInt(nampilinKeranjang.reme_price.split(",")[0].replace(/[^0-9]/g, ""))} x {nampilinKeranjang.reme_quantity} = Rp.{nampilinKeranjang.total}
                          </h1>
                        </div>
                        <div>
                          {/* <!-- Hapus --> */}
                          <button className='flex w-full mt-4 rounded-md font-bold text-red-500' onClick={() => hapusKeranjang(index)}>
                            <div>
                              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='3' stroke='currentColor' className='h-6 w-6'>
                                <path stroke-linecap='round' stroke-linejoin='round' d='M6 18L18 6M6 6l12 12' />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className='mt-3 border-t-2 border-gray-100'></div>
                    </div>
                  );
                })}
                {/* <!-- subTOtal --> */}
                <div className='flex justify-between pt-6'>
                  <div>
                    <h1 className='text-base text-gray-600 font-semibold'>Subtotal :</h1>
                  </div>
                  <div>
                    <h1 className='text-base text-gray-600 font-semibold'>Rp.{totalHarga}</h1>
                  </div>
                </div>
                <div className='flex justify-between pt-3'>
                  <div>
                    <h1 className='text-base text-gray-600 font-semibold'>Tax :</h1>
                  </div>
                  <div>
                    <h1 className='text-base text-gray-600 font-semibold'>15%</h1>
                  </div>
                </div>
                <div className='flex justify-between pt-3'>
                  <div>
                    <h1 className='text-base text-gray-600 font-semibold'>Total :</h1>
                  </div>
                  <div>
                    <h1 className='text-base text-gray-600 font-semibold'>Rp.{totalKeseluruhan()}</h1>
                  </div>
                </div>
                <div className='mt-8 w-full'>
                  <button onClick={handleCreateOrder} className='p-3 w-full font-semibold text-center bg-[#F33C5D] text-white rounded '>
                    <a>CREATE ORDER</a>
                  </button>
                </div>
                <Modal footer={null} open={modalIsOpen}>
                  <div>
                    <div className=' w-full flex justify-center mt-6'>
                      <svg className='w-28 text-green-500' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          d='M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z'
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p className=' mt-8 text-center text-2xl font-medium text-green-500'>Congrats ! </p>
                      <p className=' mb-6 mt-4 text-center text-sm text-[#4C5563]'>Succed Create Order !</p>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
