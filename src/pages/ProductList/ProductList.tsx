import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductlList'

export default function ProductList() {
  return (
    <div className='bg-[#f5f5f5] py-4'>
      <div className='container mt-5 grid grid-cols-12'>
        <div className='col-span-2 grid'>
          {/* sort */}
          <AsideFilter />
        </div>
        <div className='col-span-10 grid bg-[rgba(0,0,0,.03)]'>
          <SortProductList />
          <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {Array(30)
              .fill(0)
              .map((_, index) => (
                <div className='col-span-1' key={index}>
                  <Product />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
