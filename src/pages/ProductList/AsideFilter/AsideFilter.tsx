import React from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'
import { QueryConfig } from '../ProductList'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  console.log(category, categories)
  return (
    <div>
      <div className='mb-4'>
        <div className=' flex items-center text-center'>
          <Link to={path.home} className='mr-2'>
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
          </Link>
          <Link
            to={path.home}
            className={classNames('text-md font-bold text-[rgba(0,0,0,.8)]', {
              'text-orange': !category
            })}
          >
            Tất Cả Danh Mục
          </Link>
        </div>
        <div className=' my-3 mr-[20px] border-b-[1px] border-r-white/5 ' />
        <ul>
          {categories.map((categoriesItem) => {
            const isActive = category === categoriesItem._id
            return (
              <li className='py-2 pl-2' key={categoriesItem._id}>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoriesItem._id
                    }).toString()
                  }}
                  className={classNames('relative flex px-2', {
                    'font-semibold text-orange': isActive
                  })}
                >
                  {isActive && (
                    <svg viewBox='0 0 4 7' className='absolute left-[-10px] top-1 h-2 w-2 fill-orange'>
                      <polygon points='4 3.5 0 0 0 7'></polygon>
                    </svg>
                  )}
                  {categoriesItem.name}
                </Link>
              </li>
            )
          })}
          {/* 
          <li className='py-2 pl-2'>
            <Link to={path.home} className='relative px-2 '>
              Thời trang nam
            </Link>
          </li> */}
        </ul>
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
          <div className=' my-7 border-b-[1px] border-r-white/5 ' />
        </div>
        <div>
          <span className='mb-4 block text-sm capitalize'>khoản gía</span>
          <form className='mt-2'>
            <div className='flex items-center'>
              <div className='flex items-start'>
                <Input
                  type='text'
                  className='grow'
                  name='from'
                  placeholder='₫ TỪ'
                  classNameInput='w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                />
                <div className='mx-2 mt-2 shrink-0'>-</div>
                <Input
                  type='text'
                  className='grow'
                  name='from'
                  placeholder='₫ ĐẾN'
                  classNameInput='w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                />
              </div>
            </div>
            <Button className='w-full bg-orange px-2 py-2 text-sm uppercase text-white hover:bg-orange/80'>
              áp dụng
            </Button>
          </form>
          <div className=' my-7 border-b-[1px] border-r-white/5 ' />
        </div>
        <div>
          <span className='mb-4 block text-sm capitalize'>Đánh giá</span>
          <ul className='my-3'>
            <li className='py-1 pl-2'>
              <Link to='' className='flex items-center text-sm'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <svg viewBox='0 0 9.5 8' className='mr-1 h-4 w-4' key={index}>
                      <defs>
                        <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                          <stop offset='0' stopColor='#ffca11'></stop>
                          <stop offset='1' stopColor='#ffad27'></stop>
                        </linearGradient>
                        <polygon
                          id='ratingStar'
                          points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                        ></polygon>
                      </defs>
                      <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth='1'>
                        <g transform='translate(-876 -1270)'>
                          <g transform='translate(155 992)'>
                            <g transform='translate(600 29)'>
                              <g transform='translate(10 239)'>
                                <g transform='translate(101 10)'>
                                  <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar'></use>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  ))}
                <span>Trở lên</span>
              </Link>
            </li>
            <li className='py-1 pl-2'>
              <Link to='' className='flex items-center text-sm'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <svg viewBox='0 0 9.5 8' className='mr-1 h-4 w-4' key={index}>
                      <defs>
                        <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                          <stop offset='0' stopColor='#ffca11'></stop>
                          <stop offset='1' stopColor='#ffad27'></stop>
                        </linearGradient>
                        <polygon
                          id='ratingStar'
                          points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                        ></polygon>
                      </defs>
                      <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth='1'>
                        <g transform='translate(-876 -1270)'>
                          <g transform='translate(155 992)'>
                            <g transform='translate(600 29)'>
                              <g transform='translate(10 239)'>
                                <g transform='translate(101 10)'>
                                  <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar'></use>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  ))}
                <span>Trở lên</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className=' my-7 border-b-[1px] border-r-white/5 ' />
        <Button className='w-full bg-orange py-2 text-sm uppercase text-white hover:bg-orange/80'>xóa tất cả</Button>
      </div>
    </div>
  )
}
