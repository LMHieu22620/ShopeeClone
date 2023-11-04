import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { type InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse, RefreshTokenReponse } from 'src/types/auth.type'
import {
  clearLs,
  getAccessTokenToLs,
  getRefreshTokenToLs,
  setAccessTokenToLs,
  setProfileToLS,
  setRefreshTokenToLs
} from './auth'
import path from 'src/constants/path'
import config from 'src/constants/config'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_ACCESS_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { isAxiosExpireTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorReponseApi } from 'src/types/utils.file'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    this.accessToken = getAccessTokenToLs()
    this.refreshToken = getRefreshTokenToLs()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 10,
        ' expire-refresh-token': 60 * 60
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.data?.access_token
          this.refreshToken = data.data?.refresh_token
          setRefreshTokenToLs(this.refreshToken)
          setAccessTokenToLs(this.accessToken)
          setProfileToLS(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLs()
        }

        return response
      },
      (error: AxiosError) => {
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          console.log(error, 'data')
          const message = data?.message || error.message
          toast.error(message)
        }
        if (isAxiosUnauthorizedError<ErrorReponseApi<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const { url } = config
          console.log(url)
          if (isAxiosExpireTokenError(error) && url !== URL_REFRESH_ACCESS_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshTokenRequest().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 5)
                })
            return this.refreshTokenRequest.then((access_token) => {
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }

          clearLs()
          this.refreshToken = ''
          this.accessToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
        }

        return Promise.reject(error)
      }
    )
  }
  private handleRefreshTokenRequest() {
    return this.instance
      .post<RefreshTokenReponse>(URL_REFRESH_ACCESS_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        this.accessToken = access_token
        setAccessTokenToLs(access_token)
        return access_token
      })
      .catch((err) => {
        this.refreshToken = ''
        this.accessToken = ''
        throw err
      })
  }
}

const http = new Http().instance

export default http
