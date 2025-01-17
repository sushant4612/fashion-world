import React from 'react'

interface TitleProps{
  text1: string;
  text2: string;
}

const Title:React.FC<TitleProps> = ({text1, text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-6'>
      <p className='text-gray-500 text-lg sm:text-xl  md:text-2xl font-semibold'>
        {text1} <span className='text-gray-700 font-bold text-lg sm:text-xl md:text-2xl'>{text2}</span>
      </p>
      <p className='w-10 sm:w-16 h-[2px] sm:h-[3px] bg-gray-700 transition-transform duration-500 transform hover:scale-110'></p>
    </div>
  )
}

export default Title