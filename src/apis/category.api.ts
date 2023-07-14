import { Category } from 'src/types/category.type'
import { SuccessReponseApi } from 'src/types/utils.file'
import http from 'src/utils/http'

const URL = 'categories'

const categoryApi = {
  getCategories() {
    return http.get<SuccessReponseApi<Category[]>>(URL)
  }
}
export default categoryApi
