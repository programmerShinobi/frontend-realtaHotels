import { orderMenusOneAkhirRequest } from "@/redux/Actions/Resto/reduceActions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NextApiRequest, NextApiResponse } from "next";

export default function BillOrder() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [Data, setData] = useState([]);

  // console.log("Ini data", Data);

  const dataAkhuir = useSelector((state: any) => state.orderMenusAkhirReducers.orderMenusAkhir);

  useEffect(() => {
    dispatch(orderMenusOneAkhirRequest());
  }, [Data]);

  useEffect(() => {
    if (dataAkhuir) {
      setData(dataAkhuir);
    }
  });

  type KeranjangType = {
    id: number;
    name: string;
    price: number;
  };
  const [Keranjang, setKeranjang] = useState<KeranjangType[]>([]);

  useEffect(() => {
    const keranjangString: any = router.query.Keranjang;
    if (keranjangString) {
      setKeranjang(JSON.parse(keranjangString));
    }
  }, []);

  const totalHarga = Keranjang.reduce((total: number, item: any) => {
    return total + item.total;
  }, 0);

  // console.log("ini Keranjang", Keranjang);

  return (
    <div>
      <div className=' flex justify-center h-min mt-12 '>
        <title>Resto Bill</title>
        {Data.map((value: any) => {
          // console.log(value);
          return (
            <div className='card h-min w-[300px] bg-gray-100'>
              <div className='flex justify-center'>
                <div>
                  <svg className='w-5' data-darkreader-inline-stroke='' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                    <path
                      strokeLinecap='round'
                      stroke-linejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    ></path>
                  </svg>
                </div>
                <div className='ml-3'>
                  <p className='text-sm font-medium'>Items Ordered</p>
                </div>
              </div>

              <div className='mt-3 border-t-2 border-gray-300'></div>
              <div className='mt-2'>
                <p className='text-base font-medium'>Hotel Realta</p>
              </div>
              <div className='mt-[5px] flex justify-between'>
                <div>
                  <p className='text-xs'>Order Number :</p>
                </div>
                <div>
                  <p className='text-xs'>{value.orme_order_number}</p>
                </div>
              </div>
              <div className='mt-[5px] flex justify-between'>
                <div>
                  <p className='text-xs'>Invoice Number :</p>
                </div>
                <div>
                  <p className='text-xs'>gwg4</p>
                </div>
              </div>
              <div className='mt-[5px] flex justify-between'>
                <div>
                  <p className='text-xs'>Payment Type :</p>
                </div>
                <div>
                  <p className='text-xs'>{value.orme_pay_type}</p>
                </div>
              </div>
              <div className='mt-[5px] flex justify-between'>
                <div>
                  <p className='text-xs'>Deliver to room :</p>
                </div>
                <div>
                  <p className='text-xs'>13341</p>
                </div>
              </div>
              {Keranjang.map((value: any) => {
                return (
                  <div>
                    <div className='mt-3 border-t-2 border-gray-300'></div>
                    <div className='mt-2'>
                      <p className='text-base font-medium'>{value.reme_name}</p>
                    </div>
                    <div className='mt-[5px] flex justify-between'>
                      <div>
                        <p className='text-xs'>
                          {value.reme_price} x {value.reme_quantity}
                        </p>
                      </div>
                      <div>
                        <p className='text-xs'>{value.total}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className='mt-3 border-t-2 border-gray-300'></div>
              <div className='mt-[5px] flex justify-between'>
                <div>
                  <p className='text-xs'>Subtotal :</p>
                </div>
                <div>
                  <p className='text-xs'>{totalHarga}</p>
                </div>
              </div>
              <div className='mt-[5px] flex justify-between'>
                <div>
                  <p className='text-xs'>Discount :</p>
                </div>
                <div>
                  <p className='text-xs'>{value.orme_total_discount}</p>
                </div>
              </div>
              <div className='mt-[5px] flex justify-between'>
                <div>
                  <p className='text-xs'>Tax :</p>
                </div>
                <div>
                  <p className='text-xs'>15%</p>
                </div>
              </div>
              <div className='mt-[8px] flex justify-between'>
                <div>
                  <p className='text-sm font-medium'>Total :</p>
                </div>
                <div>
                  <p className='text-sm font-medium'>{value.orme_total_amount}</p>
                </div>
              </div>

              <div>
                <p className=' text-center text-xs p-7'>Thanks you, Your order will be send to your room (Number room)</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className='flex justify-center'>
        <a className=' print:hidden text-blue-700 underline text-sm font-thin mx-2' href='javascript:window.print()'>
          Print
        </a>
        <a className=' print:hidden text-blue-700 underline text-sm font-thin mx-2' href='../'>
          Back
        </a>
      </div>
    </div>
  );
}
