export interface Check {
  checkNumber: number
  isCashed: boolean
  amount: number
  notes?: string
  recipient: string
  cashDate: Date
  depositDate?: Date
}
