'use client'

import { ProductInterface } from '@/interfaces/product.interface';
import React, { useState } from 'react';
import ProductItem from './ProductItem';

export default function ProductSearchList({ products }: { products: ProductInterface[] }) {
  const [searchTerm, setSearchTerm] = useState('');


  const filteredProducts = products.filter((prod) =>
    prod.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>

      <div className="   flex justify-center mt-10">
        <input
          type="text"
          placeholder="Search products..."
          className=" w-full border border-gray-300 rounded-lg p-2  focus:outline-none focus:ring focus:ring-green-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>


      <div className="flex flex-wrap">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <ProductItem key={prod._id} prod={prod} />
          ))
        ) : (
          <p className="text-center w-full text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}
