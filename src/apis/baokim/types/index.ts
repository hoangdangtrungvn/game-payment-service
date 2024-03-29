export type Response<T> = {
  code: number
  message: any
  count: number
  data: T
}

export type SendOrderRequest = {
  mrc_order_id: string
  total_amount: number
  description: string
  url_success?: string
  merchant_id: number
  url_detail?: string
  lang?: 'vi' | 'en'
  bpm_id?: number
  webhooks?: string
  customer_email?: string
  customer_phone?: string
  customer_name?: string
  customer_address?: string
}

export type SendOrderResponse = {
  order_id: number
  redirect_url: string
  payment_url: string
}

export type OrderDetailResponse = {
  id: number
  user_id: number
  mrc_order_id: string
  txn_id: number
  ref_no: string
  total_amount: string
  description: string
  items: object
  url_success: string
  url_cancel: object
  url_detail: string
  stat: string
  lang: string
  bpm_id: number
  type: number
  accept_qrpay: number
  accept_bank: number
  accept_cc: number
  accept_ib: number
  accept_ewallet: number
  accept_installments: number
  order_id: number
  email: string
  name: string
  webhooks: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  created_at: string
  updated_at: string
}

export type CancelOrderRequest = {
  id: number
}

export type CancelOrderResponse = {
  id: number
  user_id: number
  mrc_order_id: string
  txn_id: number
  ref_no: string
  total_amount: string
  description: string
  items: object
  url_success: string
  url_cancel: object
  url_detail: string
  stat: string
  lang: string
  bpm_id: number
  type: number
  accept_qrpay: number
  accept_bank: number
  accept_cc: number
  accept_ib: number
  accept_ewallet: number
  accept_installments: number
  order_id: number
  email: string
  name: string
  webhooks: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  created_at: string
  updated_at: string
}

export enum ErrorCode {
  ERR_NONE = 0,
  ERR_SYSTEM = 1,
  ERR_VALIDATION = 2,
  ERR_OBJECT_NOT_FOUND = 3,
  ERR_ACCOUNT_LOCKED = 4,
  ERR_UNAUTHORIZED = 5,
  ERR_INVALID_AMOUNT = 6,
  ERR_DUPLICATED_ACTION = 7,
  ERR_INTERNAL_SERVICE = 8,
  ERR_INSUFFICIENT_BALANCE = 9,
  ERR_EXCEED_MAX_DAILY_AMOUNT = 10,
  ERR_VERIFY_FAILED = 11,
  ERR_CONFIG_FEE_NOT_FOUND = 12,
  ERR_ACCOUNT_NOT_FOUND = 13,
  ERR_AMOUNT_TOO_SMALL = 14,
  ERR_AMOUNT_TOO_BIG = 15,
  ERR_USER_NOT_VERIFIED = 16,
  ERR_TRANSACTION_NOT_COMPLETE = 17,
  ERR_TRANSACTION_REFUNDED = 18,
  ERR_BANK_ACCOUNT_EXISTED = 19,
  ERR_BANK_CARD_NOT_FOUND = 20,
  ERR_TRANSFER_ON_BANK = 21,
  ERR_BANK_ACCOUNT_NAME_NOT_MATCH = 22,
  ERR_BANK_ACCOUNT_NOT_FOUND = 23,
  ERR_OTHER = 24,
  ERR_REFUND_NOT_ALLOWED = 25,
  ERR_BANK_CARD_EXISTED = 27,
  ERR_LINKED_USER_EXIST = 47,
  ERR_MRC_NOT_FOUND = 48,
  ERR_LINKED_CODE_INVALID = 49,
  ERR_TICKET_FALSE = 51,
  ERR_LINKED_TOKEN_INVALID = 52,
  ERR_LINKED_USER_VERIFIED = 53,
  ERR_TICKET_EXPIRED = 61,
  ERR_LINKED_CODE_EXPIRED = 62,
  ERR_TOKEN_UNAUTHORIZATION = 63,
  ERR_AUTHENTICATION_BANK_CARD = 180,
}
