import { ProductList, ProductListConfig, Products } from 'src/types/product.type'
import { SuccessReponseApi } from 'src/types/utils.file'
import http from 'src/utils/http'

const URL = 'products'

const productApi = {
  getProduct(params: ProductListConfig) {
    return http.get<SuccessReponseApi<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccessReponseApi<Products>>(`${URL}/${id}`)
  }
}
export default productApi
