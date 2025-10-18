'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import Image from 'next/image'

import cat1 from '../../assets/images/catslider1.png'
import cat2 from '../../assets/images/catslider2.png'
import cat3 from '../../assets/images/catslider3.png'
import cat4 from '../../assets/images/catslider4.png'
import cat5 from '../../assets/images/catslider5.jpeg'
import cat6 from '../../assets/images/catslider6.jpeg'
import cat7 from '../../assets/images/catslider7.jpeg'
import cat8 from '../../assets/images/catslider8.png'
import cat9 from '../../assets/images/catslider9.png'

export default function CatSlider() {


  const categories = [
    "Electronics",
    "Books",
    "SuperMarket",
    "Mobiles",
    "Women's Fashion",
    "Men's Fashion",
    "Music",
    "Home",
    "Baby&Toys",
  ]

  return (
    <div className='w-full mt-13 mb-10'>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={10}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className='w-full'
      >
        {[
          { img: cat1, title: categories[0] },
          { img: cat2, title: categories[1] },
          { img: cat3, title: categories[2] },
          { img: cat4, title: categories[3] },
          { img: cat5, title: categories[4] },
          { img: cat6, title: categories[5] },
          { img: cat7, title: categories[6] },
          { img: cat8, title: categories[7] },
          { img: cat9, title: categories[8] },
        ].map((cat, i) => (
          <SwiperSlide key={i} className="flex flex-col items-center">
            <div className="overflow-hidden  transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <Image
                src={cat.img}
                alt={cat.title}
                className="w-full h-[250px] md:h-[300px] lg:h-[350px] object-cover"
              />
            </div>
            <h3 className="mt-3 text-center text-gray-800 font-semibold text-sm md:text-base">
              {cat.title}
            </h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
