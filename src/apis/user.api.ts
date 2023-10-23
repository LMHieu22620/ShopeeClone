import { User } from 'src/types/user.type'
import { SuccessReponseApi } from 'src/types/utils.file'
import http from 'src/utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const userApi = {
  getProfile() {
    return http.get<SuccessReponseApi<User>>('me')
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessReponseApi<User>>('user', body)
  },
  uploadAvatar(body: FormData) {
    return http.post<SuccessReponseApi<string>>('user/upload-avatar', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

export default userApi
