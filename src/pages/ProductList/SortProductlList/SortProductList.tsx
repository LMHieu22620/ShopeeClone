import React from 'react'

export default function SortProductList() {
  return (
    <div>
      {' '}
      <div className='flex h-min justify-between bg-slate-100 p-4'>
        <div className='flex'>
          <span className='mr-2 flex items-center text-sm'>Sắp xếp theo</span>
          <button className='mr-2 rounded-sm bg-orange p-2 text-sm capitalize text-white'>phổ biến</button>
          <button className='mr-2 rounded-sm bg-white p-2 text-sm capitalize text-black'>mới nhất</button>
          <button className='mr-2 rounded-sm bg-white p-2 text-sm capitalize text-black'>bán chạy</button>
          <select name='cars' id='cars' className='rounded-sm bg-white px-20 py-2  text-black'>
            <option value='volvo' className='w-full text-start'>
              Volvo
            </option>
            <option value='saab'>Saab</option>
            <option value='opel'>Opel</option>
            <option value='audi'>Audi</option>
          </select>
        </div>
        <div className='flex items-center'>
          <span className='mr-3 text-sm'>
            <span className='text-orange'>1/</span>9
          </span>
          <div>
            <button className='border-r bg-white px-3 py-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='bg-white px-3 py-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
