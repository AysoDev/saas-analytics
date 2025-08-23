export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface LoginResponse {
  success: boolean
  message?: string
  token?: string
}