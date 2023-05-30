export interface ClientProps {
  image: string
  displayName: string
  description: string
  contact: {
    mobile: string
    email: string
    address: string
  }
  createdAt?: string
  updatedAt?: string
  _id?: string
}
