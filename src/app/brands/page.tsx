'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import Loading from '../_component/Loading'





interface Brand {
  _id: string
  name: string
  image: string
}

export default function BrandsPage() {

  const { data, isLoading, isError } = useQuery<Brand[]>({
    queryKey: ['brands'],
    queryFn: async () => {
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      return res.data.data as Brand[]
    },
  })

  if (isLoading) return <Loading />
  if (isError) return <p className="text-center text-red-500">Error loading brands</p>

  return (
    <div className="container mx-auto py-10">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((brand) => (
          <div
            key={brand._id}

            className="border border-gray-300 hover:shadow-[0_0_15px_rgba(0,255,0,0.2)] overflow-hidden hover:scale-105 transition-transform cursor-pointer bg-white"
          >
            <Image
              src={brand.image}
              alt={brand.name}
              width={300}
              height={300}
              className="w-full h-55 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg">{brand.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
