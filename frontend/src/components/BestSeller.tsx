import React, { useContext, useEffect, useState } from 'react'
import { Product, ShopContext } from '../context/ShopContext'
import Title from './Title';


const BestSeller:React.FC = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState<Product[]>([]);

  useEffect(() => {
    const bestProduct = products.filter( (item) => item.bestseller);
    setBestSeller(bestProduct.slice(0,5)); 
  })

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1='BEST' text2='SELLERS'/>
        <p className='w-3/4 m-'></p>
      </div>
    </div>
  )
}

export default BestSeller