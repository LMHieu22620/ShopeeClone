import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessReponseApi } from 'src/types/utils.file'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessReponseApi<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessReponseApi<Purchase[]>>(`${URL}`, {
      params
    })
  },
  buyProduct(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessReponseApi<Purchase[]>>(`${URL}/buy-products`, body)
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessReponseApi<Purchase>>(`${URL}/update-purchase`, body)
  },
  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccessReponseApi<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}

export default purchaseApi
