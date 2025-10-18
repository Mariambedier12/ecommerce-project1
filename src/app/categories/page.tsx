'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import Loading from '../_component/Loading'



interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export default function CategoriesPage() {
  const { data, isLoading, isError } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      return res.data.data as Category[]
    },
  })

  if (isLoading) return <Loading />
  if (isError) return <p className="text-center text-red-500">Error loading categories</p>

  return (
    <div className="container mx-auto py-10">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {data?.map((cat) => (
          <div
            key={cat._id}

            className="border border-gray-300 rounded-md hover:shadow-[0_0_15px_rgba(0,255,0,0.2)] overflow-hidden hover:scale-105 transition-transform cursor-pointer bg-white"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              width={300}
              height={500}
              className="w-full h-65 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg text-green-600">{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
