import React from 'react'

export default function AsideFilter() {
  return (
    <div>
      <div className='mb-4'>
        <div className=' flex items-center text-center'>
          <div className='mr-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
              />
            </svg>
          </div>
          <div className='text-md font-bold text-[rgba(0,0,0,.8)]'>Tất Cả Danh Mục</div>
        </div>
        <div className=' my-3 mr-[20px] border-b-[1px] border-r-white/5 ' />
        <div className='mb-3 flex cursor-pointer items-center justify-start'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-4 w-3  text-[red]'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
          <div className='ml-2 text-sm font-semibold capitalize text-orange'>Thời trang nam</div>
        </div>
        <div className='mb-3 flex cursor-pointer items-center justify-start'>
          <div className='h-3 w-3' />
          <div className='ml-2 text-sm  capitalize '>Thời trang nam</div>
        </div>
        <div className='mb-3 flex cursor-pointer items-center justify-start'>
          <div className='h-3 w-3' />
          <div className='ml-2 text-sm  capitalize '>Thời trang nam</div>
        </div>
      </div>
      {/* bộ lọc tìm kiếm */}
      <div>
        <div className=' mb-5 flex items-center text-center'>
          <div className='mr-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
              />
            </svg>
          </div>
          <div className='text-md font-bold uppercase text-[rgba(0,0,0,.8)]'>bộ lọc tìm kiếm</div>
        </div>
        <div>
          <span className='mb-4 block text-sm capitalize'>theo danh mục</span>
          <div className='my-2 flex  cursor-pointer items-center'>
            <input type='checkbox' id='vehicle1' className='mr-3 cursor-pointer' />
            <label htmlFor='vehicle1' className='cursor-pointer text-sm'>
              Áo thun
            </label>
            <br />
          </div>
          <div className='my-2 flex items-center'>
            <input type='checkbox' id='vehicle1' className='mr-3 ' />
            <label htmlFor='vehicle1' className='text-sm'>
              Áo thun
            </label>
            <br />
          </div>
          <div className='my-2 flex items-center'>
            <input type='checkbox' id='vehicle1' className='mr-3 ' />
            <label htmlFor='vehicle1' className='text-sm'>
              Áo thun
            </label>
            <br />
          </div>
          <div className=' my-7 mr-[20px] border-b-[1px] border-r-white/5 ' />
        </div>
      </div>
    </div>
  )
}
