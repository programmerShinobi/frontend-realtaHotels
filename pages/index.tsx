import Head from 'next/head';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Slideshow from '@/components/Layout/guest/slideshow';
import SearchHotel from '@/components/Layout/guest/search';
import CardHotel from '@/components/Layout/guest/cardHotel';
import { doCardHotelReq } from '@/redux/Actions/Booking/actionHotel';
import { CgGym, CgKey } from 'react-icons/cg';
import { HiBuildingLibrary } from 'react-icons/hi2';
import {MdMeetingRoom} from 'react-icons/md'
import { BiSwim, BiWifi } from 'react-icons/bi';
import { IoRestaurantOutline } from 'react-icons/io5';
import { BsPeople } from 'react-icons/bs';
import Header from '@/components/Header/guest';
import Footer from '@/components/Footer/guest/footer';
import Layouts from '@/components/Layout';
import styles from "@/styles/ContentHome.module.css";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doCardHotelReq());
  }, []);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layouts>
        <div className='flex justify-center h-screen pt-3'>
          <div className='w-full'>
            <Slideshow/>
            <SearchHotel/>
          </div>
        </div>
        <div id="hotels" className='justify-center text-center font-bold text-2xl pb-16'>
          <h1 className={styles.textTitleInHome}>Best Hotels 2023</h1>
          <div className='flex justify-center mt-6'>
            <CardHotel/>
          </div>
        </div>
        <div id="facility" className='text-center pb-16'>
          <div className='font-bold text-2xl  mt-12 text-center'>
            <h1 className={styles.textTitleInHome}>Facility Our Hotels</h1>
          </div>
          <div className='h-80 mt-12' style={{background:'rgba(243, 60, 93, 0.09)'}}>
            <div className='flex justify-center space-x-32 pt-12'>
              <div>
                <div className='flex justify-center'><HiBuildingLibrary className='text-4xl  text-rose-500'/></div><h2 className={styles.textLabelInHome}>Balroom</h2>
              </div>
              <div className='justify-center'><MdMeetingRoom className='text-4xl text-rose-500'/><h2 className={styles.textLabelInHome}>Aula</h2></div>
              <div className='justify-center'><CgGym className='text-4xl  text-rose-500'/><h2 className={styles.textLabelInHome}>Gym</h2></div>
              <div className='justify-center'><CgKey className='text-4xl  text-rose-500'/><h2 className={styles.textLabelInHome}>Room</h2></div>
              <div className='justify-center'><BiWifi className='text-4xl  text-rose-500'/><h2 className={styles.textLabelInHome}>Wifi</h2></div>
            </div>
            <div className='pl-5 flex justify-center space-x-24 pt-12'>
              <div>
                <div className='flex justify-center'><BiSwim className='text-4xl text-rose-500'/></div><h2 className={styles.textLabelInHome}>Swimming <br/> Pool</h2>
              </div>
              <div>
                <div className='flex justify-center'><BsPeople className='text-4xl text-rose-500'/></div><h2 className={styles.textLabelInHome}>Meeting <br/> Room</h2>
              </div>
              <div>
                <div className='flex justify-center'><IoRestaurantOutline className='text-4xl  text-rose-500'/></div><h2 className={styles.textLabelInHome}>Restaurant <br/> 5 Stars</h2>
              </div>
            </div>
          </div>
        </div>
        <div id="about" className="pr-12 pl-12">
          <div className='mt-12 text-center font-bold text-2xl'>
            <h1 className={styles.textTitleInHome}>About Realta Hotel</h1>
          </div>
          <div className='h-56 px-0 py-6 mb-12 mt-6 text-justify'>
            <p className={styles.textLabelInHomeAbout}> Realta is a company engaged in the hotel sector. This company has a mission to provide every guest with an extraordinary and satisfying stay experience. Realta has various types of rooms, ranging from standard rooms to luxury suites, which are packed with modern and comfortable facilities.
              <br /><br />The company's strategic location, close to various tourist attractions and business centers, makes Realta the right choice for tourists and business travelers. Realta also has complete facilities, such as a restaurant, swimming pool, spa and fitness center, so that guests can enjoy their leisure time comfortably.</p>
          </div>
        </div>
      </Layouts>
    </>
  );
}