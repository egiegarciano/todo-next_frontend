export type Token = {
  username: string
  token: string
}

export type SignUpRequest = {
  username: string
  email: string
  password: string
  password2: string
}

export type SignUpResponse = {
  response: string
  username: string
  email: string
  token: string
}

export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
  email: string
  user_id: number
}

export type LogoutResponse = {
  message: string
}
