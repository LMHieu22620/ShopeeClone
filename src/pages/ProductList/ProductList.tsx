import { useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined } from 'lodash'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product'
import useQueryParams from 'src/hooks/useQueryParams'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import { useState } from 'react'
import { ProductListConfig } from 'src/types/product.type'
import categoryApi from 'src/apis/category.api'
import SortProductList from './components/SortProductlList'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()

  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || 20,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category
    },
    isUndefined
  )

  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProduct(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='bg-[#f5f5f5] py-4'>
      {productData && (
        <div className='container mt-5 grid grid-cols-12 gap-5'>
          <div className='col-span-2 grid'>
            {/* sort */}
            <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
          </div>
          <div className='col-span-10 bg-[rgba(0,0,0,.03)]'>
            <SortProductList queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {productData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
            <Pagination queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
          </div>
        </div>
      )}
    </div>
  )
}
