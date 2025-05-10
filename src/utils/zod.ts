import { z } from 'zod'

export const zodRequiredString = (message = '필수 입력입니다') =>
  z.string({ required_error: message }).trim().min(1, { message })

export const zodEmail = (message = '올바른 이메일 형식이 아닙니다') =>
  z.string().email(message)

export const zodPhone = (message = '올바른 전화번호 형식이 아닙니다') =>
  z.string().regex(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/, message)
