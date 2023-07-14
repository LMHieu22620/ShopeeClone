import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/pages/ProductList/ProductList'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
const RANGE = 2

export default function Pagination({ pageSize, queryConfig }: Props) {
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span
            key={index}
            className='mx-2 flex cursor-pointer items-center justify-center rounded border bg-white px-3 py-2 shadow-sm'
          >
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span
            key={index}
            className='mx-2 flex cursor-pointer items-center justify-center rounded border bg-white px-3 py-2 shadow-sm'
          >
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= page * RANGE + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          console.log(pageNumber, page, RANGE)
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'mx-2 flex cursor-pointer items-center justify-center rounded border bg-white px-3 py-2 shadow-sm',
              {
                'border-cyan-500': pageNumber === page,
                'border-transparent': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='mt-6 flex flex-wrap justify-center '>
      {page === 1 ? (
        <span className='mx-2 flex cursor-not-allowed items-center justify-center rounded border bg-white/60 px-3 py-2 shadow-sm'>
          Prev
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
          className='mx-2 flex cursor-pointer items-center justify-center rounded border bg-white px-3 py-2 shadow-sm'
        >
          Prev
        </Link>
      )}

      {renderPagination()}
      {page === pageSize ? (
        <span className='mx-2 flex cursor-not-allowed items-center justify-center rounded border bg-white/60 px-3 py-2 shadow-sm'>
          next
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
          className='mx-2 flex cursor-pointer items-center justify-center rounded border bg-white px-3 py-2 shadow-sm'
        >
          next
        </Link>
      )}
    </div>
  )
}
