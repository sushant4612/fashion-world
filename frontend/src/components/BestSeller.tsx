import React, { useContext, useEffect, useState } from 'react'
import { Product, ShopContext } from '../context/ShopContext'
import Title from './Title';
import { ProductItem } from './ProductItem';


const BestSeller:React.FC = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState<Product[]>([]);

  useEffect(() => {
    const bestProduct = products.filter( (item) => item.bestseller);
    setBestSeller(bestProduct.slice(0,5)); 
  },[products])

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1='BEST' text2='SELLERS'/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Explore our best-selling products, handpicked for their quality, popularity, and customer satisfaction. These items are the most loved by our customers, so don't miss out on them!
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map((item) => (
            <div key={item._id} className="transition-transform duration-300 hover:scale-105 hover:shadow-xl transform">
              <ProductItem
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            </div>
        ))}
      </div>
    </div>
  )
}

export default BestSeller