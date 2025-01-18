import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

interface ProductItemProps {
  id: string;
  image: string[];
  name: string;
  price: number
}

export const ProductItem:React.FC<ProductItemProps> = ({id, image, name, price}) => {
  const {currency} = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
      <div className='rounded-md overflow-hidden group'>
        <img className='group-hover:scale-110 transition-transform duration-300 ease-in-out' src={image[0]} alt={name}/>
        <p className='pt-3 pb-1 text-sm font-semibold'>{name}</p>
        <p className='text-sm font-medium'>{currency} {price}</p>
      </div>
    </Link>
  )
}
