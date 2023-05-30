import mongoose from 'mongoose'
import { ClientProps } from 'types'

const ClientSchema: mongoose.Schema<
  ClientProps,
  mongoose.Model<ClientProps, any, any>,
  undefined,
  {}
> = new mongoose.Schema<ClientProps>({
  image: { type: mongoose.Schema.Types.String, required: true },
  displayName: { type: mongoose.Schema.Types.String, required: true },
  description: { type: mongoose.Schema.Types.String, required: true },
  contact: {
    mobile: { type: mongoose.Schema.Types.String, required: true },
    email: { type: mongoose.Schema.Types.String, required: true },
    address: { type: mongoose.Schema.Types.String, required: true },
  }
}, {
  timestamps: true
})

export const Client = mongoose.model<ClientProps>('Client', ClientSchema)
