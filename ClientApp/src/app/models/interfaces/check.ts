export interface Check {
  checkId: number
  checkNumber: number
  isCashed: boolean
  amount: number
  notes?: string
  recipient: string
  cashDate: Date
  depositDate?: Date
  userId: number
}
