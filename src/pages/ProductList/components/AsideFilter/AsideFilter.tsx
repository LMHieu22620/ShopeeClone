import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import { QueryConfig } from '../../ProductList'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'
import InputNumber from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefineField } from 'src/types/utils.file'
import { omit } from 'lodash'
import RatingStart from '../RatingStart'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefineField<Pick<Schema, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const handlleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }

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
          <span className='mb-4 block text-sm capitalize'>khoản giá</span>
          <form className='mt-2' onSubmit={onSubmit}>
            <div className='flex items-center'>
              <div className='flex items-start'>
                <Controller
                  control={control}
                  name='price_min'
                  render={({ field }) => {
                    return (
                      <InputNumber
                        type='text'
                        className='grow'
                        placeholder='₫ TỪ'
                        classNameInput='w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                        {...field}
                        onChange={(event) => {
                          field.onChange(event)
                          trigger('price_max')
                        }}
                        classNameError='hidden'
                      />
                    )
                  }}
                />
                <div className='mx-2 mt-2 shrink-0'>-</div>
                <Controller
                  control={control}
                  name='price_max'
                  render={({ field }) => {
                    return (
                      <InputNumber
                        type='text'
                        className='grow'
                        placeholder='₫ ĐẾN'
                        classNameError='hidden'
                        classNameInput='w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                        {...field}
                        onChange={(event) => {
                          field.onChange(event)
                          trigger('price_min')
                        }}
                      />
                    )
                  }}
                />
              </div>
            </div>
            <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
            <Button className='w-full bg-orange px-2 py-2 text-sm uppercase text-white hover:bg-orange/80'>
              áp dụng
            </Button>
          </form>
          <div className=' my-7 border-b-[1px] border-r-white/5 ' />
        </div>
        <div>
          <span className='mb-4 block text-sm capitalize'>Đánh giá</span>
          <RatingStart queryConfig={queryConfig} />
        </div>
        <div className=' my-7 border-b-[1px] border-r-white/5 ' />
        <Button
          className='w-full bg-orange py-2 text-sm uppercase text-white hover:bg-orange/80'
          onClick={handlleRemoveAll}
        >
          xóa tất cả
        </Button>
      </div>
    </div>
  )
}
