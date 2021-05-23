import { API_KEY, API_BASE_URL } from 'constants/api'
import { stringify } from 'query-string'

export const INTERNAL_SERVER_ERROR_CODE = 500
class ServerError extends Error {
  code: number
  message: string
  constructor (code: number, message: string) {
    super()
    this.code = code
    this.message = message
  }
}

class InternalServerError extends ServerError {
  constructor (message?: string) {
    super(INTERNAL_SERVER_ERROR_CODE, message || 'Internal Server Error')
  }
}

const request = async <T>(
  url: string,
  queryParams?: Record<string, any>,
  options?: RequestInit
): Promise<T> => {
  const queryString = stringify({ ...(queryParams || {}), appid: API_KEY })

  try {
    const result = await fetch(`${API_BASE_URL}${url}?${queryString}`, {
      ...(options || {})
    })
    if (result.status >= 400) {
      throw await result.json()
    }

    return result.json()
  } catch (e) {
    let error
    if (e.code === INTERNAL_SERVER_ERROR_CODE) {
      error = new InternalServerError()
    } else {
      error = new ServerError(e.cod, e.message)
    }

    throw error
  }
}

const api = {
  get: async <T>(
    url: string,
    queryParams?: Record<string, any>,
    options?: RequestInit
  ): Promise<T> => {
    return await request(url, queryParams, options)
  }
}

export default api
