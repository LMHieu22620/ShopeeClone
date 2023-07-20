import { sortBy, order as orderConstant } from 'src/constants/product'
import classNames from 'classnames'
import { ProductListConfig } from 'src/types/product.type'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'
import { QueryConfig } from 'src/hooks/useQueryConfig'
interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
export default function SortProductList({ pageSize, queryConfig }: Props) {
  const page = Number(queryConfig.page)

  const { sort_by = sortBy.createdAt, order } = queryConfig

  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='flex  flex-wrap justify-between gap-2 bg-gray-300/40 p-4'>
      <div className='flex'>
        <span className='mr-2 flex  items-center text-sm'>Sắp xếp theo</span>
        <button
          className={classNames('mr-2 rounded-sm p-2 text-sm capitalize transition-colors duration-200 ease-linear', {
            'bg-orange text-white hover:bg-orange/70': isActiveSortBy(sortBy.view),
            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
          })}
          onClick={() => handleSort(sortBy.view)}
        >
          phổ biến
        </button>
        <button
          className={classNames('mr-2 rounded-sm p-2 text-sm capitalize transition-colors duration-200 ease-linear', {
            'bg-orange text-white hover:bg-orange/70': isActiveSortBy(sortBy.createdAt),
            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
          })}
          onClick={() => handleSort(sortBy.createdAt)}
        >
          mới nhất
        </button>
        <button
          className={classNames('mr-2 rounded-sm p-2 text-sm capitalize transition-colors duration-200 ease-linear', {
            'bg-orange text-white hover:bg-orange/70': isActiveSortBy(sortBy.sold),
            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
          })}
          onClick={() => handleSort(sortBy.sold)}
        >
          bán chạy
        </button>
        <select
          className={classNames('ou rounded-smpy-2  pr-10  outline-none', {
            'bg-orange text-white hover:bg-orange/70': isActiveSortBy(sortBy.price),
            'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
          })}
          value={order || ''}
          onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
        >
          <option value='' disabled className='w-full bg-white text-black'>
            Giá
          </option>
          <option value={orderConstant.asc} className='bg-white text-black'>
            Giá:Thấp đến cao
          </option>
          <option value={orderConstant.desc} className='bg-white text-black'>
            Giá:Cao đến thấp
          </option>
        </select>
      </div>
      <div className='flex items-center'>
        <span className='mr-3 text-sm'>
          <span className='text-orange'>{page}/</span>
          <span>{pageSize}</span>
        </span>
        <div className=' flex'>
          {page === 1 ? (
            <span className='flex h-8 w-10 cursor-not-allowed items-center justify-center border-r bg-white/60 px-3 shadow transition duration-200 ease-linear hover:bg-slate-100/95'>
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
            </span>
          ) : (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page - 1).toString()
                }).toString()
              }}
              className='flex h-8 w-10  items-center justify-center border-r bg-white px-3 shadow transition duration-200 ease-linear hover:bg-slate-100/95'
            >
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
            </Link>
          )}
          {page === pageSize ? (
            <span className='flex h-8 w-10 cursor-not-allowed items-center justify-center border-r bg-white/60 px-3 shadow transition duration-200 ease-linear hover:bg-slate-100/95'>
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
            </span>
          ) : (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page + 1).toString()
                }).toString()
              }}
              className='flex h-8 w-10  items-center justify-center border-r bg-white px-3 shadow transition duration-200 ease-linear hover:bg-slate-100/95'
            >
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
            </Link>
          )}
          {/* <button className='bg-white px-3 py-2 shadow transition duration-200 ease-linear hover:bg-slate-100/95'>
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
          </button> */}
        </div>
      </div>
    </div>
  )
}
