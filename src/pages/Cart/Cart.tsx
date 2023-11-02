import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

export default function Cart() {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  // console.log(extendedPurchases)
  const location = useLocation()

  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId

  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const purchasesInCart = purchasesInCartData?.data.data
  const checkedItemPurchase = extendedPurchases.filter((purchase) => {
    return purchase.checked
  })
  const checkedCount = checkedItemPurchase.length
  const totalCheckedPurchasePrice = checkedItemPurchase.reduce((result, current) => {
    return result + current.product.price * current.buy_count
  }, 0)

  const totalCheckedPurchaseSavingPrice = checkedItemPurchase.reduce((result, current) => {
    return result + (current.product.price_before_discount - current.product.price) * current.buy_count
  }, 0)
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => refetch()
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => refetch()
  })

  const buyPurchaseMutation = useMutation({
    mutationFn: purchaseApi.buyProduct,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      console.log(prev, 'ssc')

      return (
        purchasesInCart?.map((purchase) => {
          const isChoosenPurchaseFromLocation = choosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosenPurchaseFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [choosenPurchaseIdFromLocation, purchasesInCart, setExtendedPurchases])

  useEffect(() => {
    history.replaceState(null, '')
    //xóa state checked
  }, [])

  const isChecked = extendedPurchases.every((purchase) => purchase.checked)

  const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckedAll = () => {
    setExtendedPurchases((prev) => {
      return prev.map((purchase) => ({
        ...purchase,
        checked: !isChecked
      }))
    })
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleQuatity = (purchaseIndex: number, value: number, enible: boolean) => {
    if (enible) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleDeletePurchase = (purchaseIndex: number) => {
    const purchasesId = extendedPurchases[purchaseIndex]._id

    deletePurchaseMutation.mutate([purchasesId])
  }

  const handleDelettePurchaseAll = () => {
    const purchasesIds = checkedItemPurchase.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchasesIds)
  }

  const buyProduct = () => {
    if (checkedItemPurchase.length > 0) {
      const body = checkedItemPurchase.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyPurchaseMutation.mutate(body)
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {extendedPurchases.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow '>
                  <div className='col-span-6 '>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={isChecked}
                          onClick={handleCheckedAll}
                        />
                      </div>
                      <div className='flex-grow text-black'>sản phẩm</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>số lượng</div>
                      <div className='col-span-1'>số tiền</div>
                      <div className='col-span-1'>thao tác </div>
                    </div>
                  </div>
                </div>
                {extendedPurchases.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow'>
                    {extendedPurchases?.map((purchase, index) => (
                      <div
                        key={purchase._id}
                        className='mt-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                              <input
                                type='checkbox'
                                className='h-5 w-5 accent-orange'
                                checked={purchase.checked}
                                onChange={handleChecked(index)}
                              />
                            </div>
                            <div className='flex-grow'>
                              <div className='flex '>
                                <Link
                                  to={`${path.home}${generateNameId({
                                    name: purchase.product.name,
                                    id: purchase.product._id
                                  })}`}
                                  className='h-20 w-20 flex-shrink-0'
                                >
                                  <img alt={purchase.product.name} src={purchase.product.image} />
                                </Link>
                                <div className=' flex flex-grow items-center px-2 pb-2 pt-1'>
                                  <Link
                                    to={`${path.home}${generateNameId({
                                      name: purchase.product.name,
                                      id: purchase.product._id
                                    })}`}
                                    className='line-clamp-2'
                                  >
                                    {purchase.product.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-6 flex items-center'>
                          <div className='grid grid-cols-5 items-center '>
                            <div className='col-span-2'>
                              <div className='flex items-center justify-center'>
                                <span className='text-gray-300 line-through'>
                                  ₫{formatCurrency(purchase.product.price_before_discount)}
                                </span>
                                <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <QuantityController
                                max={purchase.product.quantity}
                                value={purchase.buy_count}
                                onIncrease={(value) => handleQuatity(index, value, value <= purchase.product.quantity)}
                                onDecrease={(value) => handleQuatity(index, value, value >= 1)}
                                onFocusOut={(value) =>
                                  handleQuatity(
                                    index,
                                    value,
                                    value >= 1 &&
                                      value <= purchase.product.quantity &&
                                      value !== (purchasesInCart as Purchase[])[index].buy_count
                                  )
                                }
                                onType={handleTypeQuantity(index)}
                                disabled={purchase.disabled}
                                classNameWrapper='flex items-center'
                              />
                            </div>
                            <div className='col-span-1'>
                              <span className='text-orange'>
                                ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                              </span>
                            </div>
                            <div className='col-span-1'>
                              <button
                                className='bg-none text-black transition-colors hover:text-orange'
                                onClick={() => handleDeletePurchase(index)}
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='sticky bottom-0 z-10  mt-10 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange'
                    checked={isChecked}
                    onClick={handleCheckedAll}
                  />
                </div>
                <button className='mx-3 border-none bg-none' onClick={handleCheckedAll}>
                  Chọn tất cả ({extendedPurchases.length})
                </button>
                <button className='mx-3 border-none bg-none' onClick={handleDelettePurchaseAll}>
                  Xóa
                </button>
              </div>

              <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div>Tổng thanh toán ( {checkedCount} sản phẩm): </div>
                    <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
                  </div>
                  <div className='flex items-center text-sm sm:justify-end'>
                    <div className='text-gray-500'>Tiết kiệm</div>
                    <div className='ml-6 text-orange'>₫{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
                  </div>
                </div>
                <Button
                  onClick={buyProduct}
                  disabled={buyPurchaseMutation.isLoading}
                  className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-center text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <div className='text-center'>
              <img
                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png'
                alt='no-purchase'
                className='mx-auto h-24 w-24'
              />
              <div className='mb-5 mt-5 font-bold text-gray-500'>Giỏ hàng của bạn còn trống</div>
              <Link
                className='mt-5 rounded-sm bg-orange px-10 py-3 uppercase text-white transition-all hover:bg-orange/80'
                to={path.home}
              >
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
