import { User } from '~/types/user'
import { Task } from '~/types/task'

export interface Document {
  id: number
  title: string
  filePath: string
  createdAt: string
  prevVersion?: Document
  verifiedStatus: Boolean
  verifiedBy?: User
  task: Task
}
